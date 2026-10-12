/** Conservative MP4 validation before any billable provider request. */
export function inspectMp4(buf: Buffer): { duration: number; frames: number } {
  let duration = 0, frames = 0, videoTracks = 0, movie = false;
  function boxes(start: number, end: number): Array<{ type: string; start: number; end: number }> {
    const out = [];
    for (let pos = start; pos < end;) {
      if (end - pos < 8) throw new Error('Invalid MP4 box');
      let size = buf.readUInt32BE(pos), header = 8;
      if (size === 1) { if (end - pos < 16) throw new Error('Invalid MP4 box'); const large = buf.readBigUInt64BE(pos + 8); if (large > BigInt(buf.length)) throw new Error('Invalid MP4 size'); size = Number(large); header = 16; }
      if (size === 0) size = end - pos;
      if (size < header || pos + size > end) throw new Error('Invalid MP4 size');
      out.push({ type: buf.toString('ascii', pos + 4, pos + 8), start: pos + header, end: pos + size }); pos += size;
    }
    return out;
  }
  function seconds(start: number, end: number): number {
    const version = buf[start];
    if (version !== 0 && version !== 1) throw new Error('Unsupported MP4 version');
    const scalePos = start + (version === 1 ? 20 : 12), timePos = scalePos + 4;
    if (end < timePos + (version === 1 ? 8 : 4)) throw new Error('Invalid MP4 duration');
    const scale = buf.readUInt32BE(scalePos);
    const time = version === 1 ? Number(buf.readBigUInt64BE(timePos)) : buf.readUInt32BE(timePos);
    if (!scale || !Number.isFinite(time) || time <= 0) throw new Error('Invalid MP4 duration');
    return time / scale;
  }
  const top = boxes(0, buf.length);
  if (!top.some(b => b.type === 'ftyp') || top.some(b => b.type === 'moof')) throw new Error('Use a non-fragmented MP4');
  for (const moov of top.filter(b => b.type === 'moov')) {
    if (movie) throw new Error('Multiple movie headers'); movie = true;
    const children = boxes(moov.start, moov.end);
    if (children.some(b => b.type === 'mvex')) throw new Error('Fragmented MP4 is not supported');
    const mvhd = children.find(b => b.type === 'mvhd'); if (!mvhd) throw new Error('Missing movie duration');
    duration = seconds(mvhd.start, mvhd.end);
    for (const trak of children.filter(b => b.type === 'trak')) {
      const mdia = boxes(trak.start, trak.end).find(b => b.type === 'mdia'); if (!mdia) throw new Error('Missing media');
      const media = boxes(mdia.start, mdia.end);
      const hdlr = media.find(b => b.type === 'hdlr'); if (!hdlr || hdlr.end < hdlr.start + 12) throw new Error('Missing handler');
      const mdhd = media.find(b => b.type === 'mdhd'); if (!mdhd) throw new Error('Missing track duration');
      duration = Math.max(duration, seconds(mdhd.start, mdhd.end));
      if (buf.toString('ascii', hdlr.start + 8, hdlr.start + 12) !== 'vide') continue;
      videoTracks++;
      const minf = media.find(b => b.type === 'minf'); if (!minf) throw new Error('Missing samples');
      const stbl = boxes(minf.start, minf.end).find(b => b.type === 'stbl'); if (!stbl) throw new Error('Missing samples');
      const stsz = boxes(stbl.start, stbl.end).find(b => b.type === 'stsz');
      if (!stsz || stsz.end < stsz.start + 12) throw new Error('Missing sample count');
      frames = buf.readUInt32BE(stsz.start + 8);
      const stts = boxes(stbl.start, stbl.end).find(b => b.type === 'stts');
      if (!stts || stts.end < stts.start + 8) throw new Error('Missing sample timing');
      const entries = buf.readUInt32BE(stts.start + 4);
      if (entries > 60 || stts.end < stts.start + 8 + entries * 8) throw new Error('Invalid sample timing');
      let timedFrames = 0, ticks = 0;
      for (let i = 0; i < entries; i++) { const count = buf.readUInt32BE(stts.start + 8 + i * 8), delta = buf.readUInt32BE(stts.start + 12 + i * 8); if (!delta) throw new Error('Invalid sample timing'); timedFrames += count; ticks += count * delta; }
      if (timedFrames !== frames) throw new Error('Inconsistent sample count');
      const scale = buf.readUInt32BE(mdhd.start + (buf[mdhd.start] === 1 ? 20 : 12));
      duration = Math.max(duration, ticks / scale);
    }
  }
  if (!movie || videoTracks !== 1 || !frames || frames > 60 || duration > 5) throw new Error('MP4 limit: 5 seconds and 60 frames');
  return { duration, frames };
}

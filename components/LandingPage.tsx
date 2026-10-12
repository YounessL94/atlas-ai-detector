import Link from 'next/link';
import Detector from './Detector';
import Waitlist from './Waitlist';
import { RouteContent, pathFor } from '@/lib/content';
import { jsonLd } from '@/lib/seo';
import { textDetectionAvailable } from '@/lib/analysis';

export default function LandingPage({ route }: { route: RouteContent }) {
  const isFr = route.locale === 'fr';
  const isTool = ['image', 'text', 'c2pa', 'hub', 'video'].includes(route.toolType);
  const isBeta = route.toolType === 'deepfake';
  const isLegal = route.toolType === 'privacy' || route.toolType === 'terms';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(route)).replace(/</g, '\\u003c') }}
      />
      <div className="lang-switch">
        <Link href={pathFor(route.alt)} hrefLang={isFr ? 'en' : 'fr'} lang={isFr ? 'en' : 'fr'}>
          {isFr ? 'English' : 'Français'}
        </Link>
      </div>
      <section className={isLegal ? 'hero hero-left' : 'hero'}>
        {!isLegal && <div className="hero-eyebrow"><span className="live-dot" /> ATLAS AI DETECTOR <span className="eyebrow-divider">/</span> AI CONTENT DETECTION</div>}
        <h1>{route.toolType === "hub" ? (isFr ? "Vérifiez les signaux IA. Examinez la provenance." : "Check AI signals. Explore content provenance.") : route.h1}</h1>
        <p>{route.toolType === "hub" ? (isFr ? "Importez une image pour repérer les indices de génération par IA et examiner sa provenance numérique. Gratuit, sans compte." : "Upload an image to check for AI-generation signals and inspect its digital provenance. Free, no account required.") : route.intro}</p>
  
      
      {isTool && (
          <div className="trust-strip">
            <span>{isFr ? 'Gratuit, sans compte' : 'Free, no account'}</span>
            <span>{isFr ? 'Contenu non conservé' : 'Content not stored'}</span>
            <span>{isFr ? 'Incertitude affichée' : 'Honest uncertainty'}</span>
          </div>
        )}
        
      </section>


      {isTool && (
        <p className="lang-switch"><Link href={isFr ? '/fr/limites-detecteur-ia-gratuit' : '/free-ai-detector-limits'}>{isFr ? 'Limites gratuites et futur accès Pro' : 'Free limits and planned Pro access'}</Link></p>
      )}
      {isTool && (
        <Detector
          locale={route.locale}
          initialModality={route.toolType === 'hub' ? 'image' : (route.toolType as 'image' | 'text' | 'c2pa' | 'video')}
          textAvailable={textDetectionAvailable()}
        />
      )}

      {isBeta && <Waitlist locale={route.locale} type={route.toolType as 'video' | 'deepfake'} />}

      <article className="prose">
        {route.sections.map((s) => (
          <section key={s.h2}>
            <h2>{s.h2}</h2>
            {s.p.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            
      </section>
        ))}
      </article>
      <nav className="lang-switch" aria-label={isFr ? 'Ressources utiles' : 'Helpful resources'}>
        <Link href={isFr ? '/fr/comprendre-resultat-detecteur-ia' : '/how-to-read-ai-detector-results'}>{isFr ? 'Comprendre un score IA' : 'Understand an AI score'}</Link>
        {' · '}
        <Link href={isFr ? '/fr/limites-detecteur-ia-gratuit' : '/free-ai-detector-limits'}>{isFr ? 'Limites gratuites' : 'Free limits'}</Link>
        {' · '}<Link href={isFr?'/fr/choisir-detecteur-ia':'/choose-ai-detector'}>{isFr?'Choisir un détecteur':'Choose a detector'}</Link>
        {' · '}<Link href={isFr?'/fr/preparer-image-analyse-ia':'/prepare-image-ai-check'}>{isFr?'Préparer une image':'Prepare an image'}</Link>
        {' · '}<Link href={isFr?'/fr/texte-signale-ia-que-faire':'/text-flagged-ai-next-steps'}>{isFr?'Texte signalé IA':'Text flagged as AI'}</Link>
      </nav>
      {process.env.AFFILIATE_GPTZERO_ENABLED==='1' && route.toolType==='text' && <aside className="card"><h2>{isFr?'Découvrir un autre outil de texte':'Explore another text tool'}</h2><p>{isFr?'GPTZero est un service externe. Consultez ses limites, prix et conditions avant de choisir. Atlas ne garantit pas sa précision.':'GPTZero is an external service. Review its limits, pricing and terms before choosing. Atlas does not guarantee its accuracy.'}</p><a href="/go/gptzero" rel="sponsored nofollow">{isFr?'Découvrir GPTZero':'Explore GPTZero'}</a><p>{isFr?'Lien affilié : Atlas peut recevoir une commission si vous achetez auprès de ce service.':'Affiliate link: Atlas may receive a commission if you purchase from this service.'}</p></aside>}

      {process.env.AFFILIATE_QUETEXT_ENABLED!=='0' && (route.toolType==='text'||route.slug==='fr/choisir-detecteur-ia'||route.slug==='choose-ai-detector') && <aside className="card"><h2>{isFr?'Besoin d’un autre service pour vos textes ?':'Need another service for your text?'}</h2><p>{isFr?'Quetext propose un service externe de vérification de textes. Consultez les fonctionnalités, les langues, les prix et les conditions sur son site avant de choisir. Atlas n’a pas réalisé de comparaison indépendante de sa précision.':'Quetext provides an external text-checking service. Review features, languages, pricing and terms on its website before choosing. Atlas has not independently compared its accuracy.'}</p><a href="/go/quetext" rel="sponsored nofollow">{isFr?'Voir les offres Quetext':'View Quetext plans'}</a><p className="small muted">{isFr?'Lien affilié : Atlas peut recevoir une commission si vous achetez auprès de Quetext. Aucun achat obligatoire ; vos contenus analysés ne sont pas transmis par ce lien.':'Affiliate link: Atlas may receive a commission if you purchase from Quetext. No purchase is required; your analyzed content is not sent through this link.'}</p></aside>}
      {route.faq.length > 0 && (
        <section className="faq-section">
          <h2>{isFr ? 'Questions fréquentes' : 'Frequently asked questions'}</h2>
          {route.faq.map((f) => (
            <div key={f.q} className="faq-item">
              <h3 className="faq-q">{f.q}</h3>
              <p className="faq-a">{f.a}</p>
            </div>
          ))}
          
      </section>
      )}

      {isTool && <Waitlist locale={route.locale} type="pro" />}
    </>
  );
}








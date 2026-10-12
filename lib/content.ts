import { Locale } from './config';

export type ToolType = 'image' | 'text' | 'c2pa' | 'hub' | 'video' | 'deepfake' | 'privacy' | 'terms' | 'guide';

export interface RouteContent {
  slug: string;
  locale: Locale;
  /** ROUTE_MAP key of the same page in the other language (hreflang). */
  alt: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  toolType: ToolType;
  sections: Array<{ h2: string; p: string[] }>;
  faq: Array<{ q: string; a: string }>;
}

export const ROUTE_MAP: Record<string, RouteContent> = {
  '': {
    slug: '',
    locale: 'en',
    alt: 'fr',
    title: 'AI Content Detection — Check Text & Images for AI | Atlas AI Detector',
    metaDescription: 'Free AI Content Detection for text and images. Check AI likelihood signals, C2PA provenance and honest uncertainty with no registration.',
    h1: 'Free AI Content Detection & Provenance',
    intro: 'Inspect images and text for AI generation signals and cryptographic Content Credentials.',
    toolType: 'hub',
    sections: [
      {
        h2: 'What Atlas AI Detector does',
        p: [
          'Atlas AI Detector combines a commercial AI-generated content classifier with Content Credentials (C2PA) inspection. You get an AI likelihood estimate, a reliability level, the provenance status of the file and the limitations that apply to the result.',
          'When the evidence is weak or contradictory, the result is INDETERMINATE. We never turn a probabilistic score into a verdict of certainty.'
        ]
      },
      {
        h2: 'How to read a result',
        p: [
          'The AI signal estimate is the provider’s model score, not a calibrated probability or a percentage of AI content. Reliability reflects input quality (length, compression) and how consistent the signals are.',
          'Content Credentials are cryptographically signed provenance records. When present and valid they are strong evidence about how a file was produced. When absent, they prove nothing: most platforms strip metadata on upload.'
        ]
      }
    ],
    faq: [
      { q: 'Can AI image detectors be wrong?', a: 'Yes. All detection methods are probabilistic estimations based on statistical patterns, not definitive proof.' },
      { q: 'Does missing C2PA mean an image is human-made?', a: 'No. C2PA credentials can be stripped by social media platforms or editing.' },
      { q: 'Do you store my uploaded images or text?', a: 'No. Content is sent to our detection provider for analysis and is not stored in our application storage.' }
    ]
  },
  'ai-detector': {
    slug: 'ai-detector',
    locale: 'en',
    alt: 'fr/detecteur-ia',
    title: 'Free AI Detector for Text & Images | Atlas AI Detector',
    metaDescription: 'Analyze text and images for AI generation signals. Fast, free, transparent analysis with honest confidence levels.',
    h1: 'Free AI Detector Hub',
    intro: 'Choose your modality to analyze AI signals and check cryptographic provenance.',
    toolType: 'hub',
    sections: [
      {
        h2: 'One detector, three checks',
        p: [
          'Image analysis estimates whether a picture was produced by a generative model and, when possible, which family of generator it most resembles. Text analysis scores passages for statistical patterns typical of large language models. The C2PA checker reads signed Content Credentials locally in your browser.'
        ]
      }
    ],
    faq: [
      { q: 'How does the AI detection hub work?', a: 'Select either image or text to run AI signal analysis and inspect embedded Content Credentials.' },
      { q: 'Is it free?', a: 'Yes. The public detectors are free with fair-use limits to prevent abuse.' }
    ]
  },
  'ai-image-detector': {
    slug: 'ai-image-detector',
    locale: 'en',
    alt: 'fr/detecteur-image-ia',
    title: 'AI Image Detector — Check If an Image Was AI-Generated | Atlas AI Detector',
    metaDescription: 'Upload an image to inspect AI-generation signals and Content Credentials. Free, no account required.',
    h1: 'AI Image Detector & Analysis',
    intro: 'Upload an image (JPG, PNG, WEBP max 4MB) to analyze synthetic visual signals and extract C2PA credentials.',
    toolType: 'image',
    sections: [
      {
        h2: 'What the image detector checks',
        p: [
          'The classifier looks for pixel-level artifacts left by diffusion models and GANs, and estimates the closest known generator (Midjourney, DALL·E, Flux, Stable Diffusion, Firefly and others). In parallel, your browser reads any embedded C2PA Content Credentials.',
          'Upload the original file whenever possible. Screenshots, heavy compression, resizing and filters remove the signals detectors rely on.'
        ]
      }
    ],
    faq: [
      { q: 'Can screenshots or compression affect detection?', a: 'Yes. Re-compressing or screenshotting images modifies pixel distribution and can lower signal accuracy.' },
      { q: 'What formats are supported?', a: 'JPG, PNG, and WEBP files up to 4MB are supported directly.' },
      { q: 'Can it detect partially edited images?', a: 'Only partially. The model is designed for fully generated images; local AI edits (inpainting) on a real photo may not be flagged.' }
    ]
  },
  'ai-text-detector': {
    slug: 'ai-text-detector',
    locale: 'en',
    alt: 'fr/detecteur-ia-texte',
    title: 'AI Text Detector — Check Text for AI Signals | Atlas AI Detector',
    metaDescription: 'Paste text to inspect signals associated with AI-generated writing. Get an AI likelihood estimate and honest reliability levels.',
    h1: 'AI Text Detector',
    intro: 'Paste text to analyze linguistic patterns. Beta limits: at least 300 characters, at most 500 words.',
    toolType: 'text',
    sections: [
      {
        h2: 'How the text detector works',
        p: [
          'Winston AI evaluates the text and returns a global human score, converted here into an AI signal score. When sentence scores suggest mixed writing, we lower reliability and may return INDETERMINATE.',
          'Short texts, lists, formulaic writing (legal, technical, templates) and text written by non-native speakers are the most common sources of false positives.'
        ]
      }
    ],
    faq: [
      { q: 'Can AI text detectors produce false positives?', a: 'Yes, particularly on short texts or technical documentation.' },
      { q: 'How much text should I submit?', a: 'A minimum of 300 characters is required. 1,500+ characters produces the most reliable analysis.' },
      { q: 'Should I use this to sanction a student or employee?', a: 'No. A detector score alone is never sufficient evidence for a disciplinary decision.' }
    ]
  },
  'content-credentials-checker': {
    slug: 'content-credentials-checker',
    locale: 'en',
    alt: 'fr/verificateur-content-credentials',
    title: 'Content Credentials Checker — Inspect C2PA Provenance | Atlas AI Detector',
    metaDescription: 'Inspect C2PA Content Credentials in your browser. Verify digital manifests and AI attribution locally.',
    h1: 'Content Credentials (C2PA) Checker',
    intro: 'Inspect embedded C2PA metadata directly in your browser without uploading your image to any server.',
    toolType: 'c2pa',
    sections: [
      {
        h2: 'What are Content Credentials?',
        p: [
          'C2PA Content Credentials are signed manifests embedded in a file that record which tool created or edited it. Adobe Firefly, OpenAI image tools, several cameras and editing apps write them.',
          'This checker reads the manifest, the signer and the validation state, and flags AI-generation declarations when present. A missing manifest is the normal case for most files online and does not indicate that content is human-made.'
        ]
      }
    ],
    faq: [
      { q: 'Is my file uploaded during C2PA verification?', a: 'No. C2PA verification runs client-side in your browser.' },
      { q: 'What does "Invalid" mean?', a: 'The manifest exists but its signature or hashes do not match the file, typically because the file was modified after signing.' }
    ]
  },
  'ai-video-detector': {
    slug: 'ai-video-detector',
    locale: 'en',
    alt: 'fr/detecteur-video-ia',
    title: 'AI Video Detector — Beta & AI Video Analysis | Atlas AI Detector',
    metaDescription: 'Analyze short MP4 clips with Hive. View AI signal scores for analyzed frames and export a report.',
    h1: 'AI Video Analysis & Detector (Beta)',
    intro: 'Analyze an MP4 clip up to 4 MB, 5 seconds and 60 frames. Limited public beta: two video analyses per day across the service.',
    toolType: 'video',
    sections: [
      {
        h2: 'How AI video detection works',
        p: [
          'Hive analyzes video frames and returns timestamped AI signal scores. This report shows the maximum score and frame details. It does not evaluate audio or prove a video’s origin.'
        ]
      }
    ],
    faq: [
      { q: 'Why is public video analysis restricted?', a: 'Frame-by-frame processing requires high computational power and temporal verification.' }
    ]
  },
  'deepfake-detector': {
    slug: 'deepfake-detector',
    locale: 'en',
    alt: 'fr/detecteur-deepfake',
    title: 'Deepfake Detector — Detection & Provenance Beta | Atlas AI Detector',
    metaDescription: 'Understand facial manipulation signals and join our deepfake detection beta list.',
    h1: 'Deepfake Detector & Facial Analysis',
    intro: 'Deepfake detection requires spatial artifact inspection and audio-visual synchronization analysis.',
    toolType: 'deepfake',
    sections: [
      {
        h2: 'Deepfakes vs. AI-generated images',
        p: [
          'A deepfake alters or swaps the identity of a real person, often in video. Fully generated images are a different problem. Deepfake detection scores each detected face and must be interpreted together with context and provenance.'
        ]
      }
    ],
    faq: [
      { q: 'How does deepfake detection differ from image detection?', a: 'Deepfake detection focuses on facial alignment and identity modification artifacts.' }
    ]
  },
  privacy: {
    slug: 'privacy',
    locale: 'en',
    alt: 'fr/confidentialite',
    title: 'Privacy Policy | Atlas AI Detector',
    metaDescription: 'Privacy policy for Atlas AI Detector.',
    h1: 'Privacy Policy',
    intro: 'We prioritize privacy and data minimization.',
    toolType: 'privacy',
    sections: [
      {
        h2: 'Content you analyze',
        p: [
          'Images and videos are transmitted over HTTPS to Hive for analysis. When text detection is available, text is sent to the configured text provider. Submitted content is then discarded by our application. We do not store submitted content in our own storage and do not use it for training.',
          'Content Credentials (C2PA) inspection runs entirely in your browser; the file is not uploaded for that check.'
        ]
      },
      {
        h2: 'Technical data',
        p: [
          'To prevent abuse we compute a salted, one-way hash of your IP address and keep short-lived counters (up to 24 hours). Raw IP addresses are not stored. Daily aggregate service counters (attempts, completed analyses, errors, waitlist registrations and partner-link redirects) are retained for up to 90 days. These counters contain no submitted content, email address or IP address. Bot protection is provided by Cloudflare Turnstile. Aggregate, cookieless audience measurement is provided by Vercel Analytics.'
        ]
      },
      {
        h2: 'Atlas accounts and Google sign-in',
        p: ['Google sign-in requests your email address and basic profile information to identify your Atlas account. It does not request access to your Gmail messages or Google Drive files. Supabase provides authentication and stores account information. Session cookies keep you signed in; signing out ends your Atlas session.', 'The account database can store credit transactions and analysis references, type, status and date. It does not store the text, images or videos you submit. Completed analyses for signed-in accounts are recorded as references, type, status and date in our protected service storage, without their content. The recent list is limited to 20 entries, retained for up to 90 days. Paid credits are not available yet. Accounts remain in beta.']
      },
      {
        h2: 'Waitlist',
        p: [
          'If you join a waitlist we store your email address and the product you selected, only to contact you about that product. Contact: contact.atlasforensics@gmail.com; no commercial launch is announced.'
        ]
      },
      {
        h2: 'Partner links', p: ['Some pages contain affiliate links identified as such. Atlas may receive a commission for eligible purchases. Clicking opens an external website whose privacy and tracking rules apply. Atlas records only an aggregate redirect counter; no analyzed content, account email or report reference is sent through the link.'] }, { h2: 'Your rights',
        p: ['You may request access, correction or deletion of your personal data. Contact: contact.atlasforensics@gmail.com.']
      }
    ],
    faq: []
  },
  terms: {
    slug: 'terms',
    locale: 'en',
    alt: 'fr/mentions-legales',
    title: 'Terms of Service | Atlas AI Detector',
    metaDescription: 'Terms of service and legal disclaimer.',
    h1: 'Terms of Service & Legal Disclaimer',
    intro: 'Atlas AI Detector is an independent beta project published by Youness Latifi. Contact: contact.atlasforensics@gmail.com. Additional legal details remain to be completed before commercial launch.',
    toolType: 'terms',
    sections: [
      {
        h2: 'Probabilistic results',
        p: [
          'All results are statistical estimates provided as-is, without warranty. They are not proof of authorship or origin and must not be used as the sole basis for disciplinary, employment, legal or financial decisions.'
        ]
      },
      {
        h2: 'Acceptable use',
        p: [
          'You must have the right to submit the content you analyze. Automated scraping, attempts to bypass rate limits or bot protection, and use of the service to develop detector-evasion tools are prohibited. Fair-use limits apply.'
        ]
      },
      {
        h2: 'Liability',
        p: ['To the extent permitted by law, Atlas Lab is not liable for decisions made on the basis of results produced by this service.']
      }
    ],
    faq: []
  },
  fr: {
    slug: 'fr',
    locale: 'fr',
    alt: '',
    title: 'Détection IA — Analysez textes et images | Atlas AI Detector',
    metaDescription: 'Détection IA gratuite pour textes et images. Analysez les signaux de génération IA et les Content Credentials C2PA.',
    h1: 'Détection IA & Provenance Gratuite',
    intro: 'Inspectez vos images et textes pour détecter les signaux de génération IA et vérifier la provenance.',
    toolType: 'hub',
    sections: [
      {
        h2: 'Ce que fait Atlas AI Detector',
        p: [
          'Atlas AI Detector combine un classifieur commercial de contenus générés par IA et l’inspection des Content Credentials (C2PA). Vous obtenez un score de signal IA, un indicateur de confiance, le statut de provenance du fichier et les limites du résultat.',
          'Quand les indices sont faibles ou contradictoires, le résultat est INDÉTERMINÉ. Nous ne transformons jamais un score probabiliste en certitude.'
        ]
      },
      {
        h2: 'Comment lire un résultat',
        p: [
          'L’estimation du signal IA est le score du fournisseur, pas une probabilité calibrée ni un pourcentage de contenu IA. La fiabilité dépend de la qualité de l’entrée (longueur, compression) et de la cohérence des signaux.',
          'L’absence de Content Credentials ne prouve rien : la plupart des plateformes suppriment les métadonnées à l’import.'
        ]
      }
    ],
    faq: [
      { q: 'Un détecteur d’image IA peut-il se tromper ?', a: 'Oui. Toutes les méthodes de détection sont des estimations probabilistes.' },
      { q: 'L’absence de C2PA signifie-t-elle qu’une image est humaine ?', a: 'Non. Les Content Credentials sont souvent supprimés par les réseaux sociaux ou l’édition.' },
      { q: 'Conservez-vous mes fichiers ou textes ?', a: 'Non. Le contenu est transmis à notre prestataire de détection pour l’analyse et n’est pas conservé dans notre stockage.' }
    ]
  },
  'fr/detecteur-ia': {
    slug: 'fr/detecteur-ia',
    locale: 'fr',
    alt: 'ai-detector',
    title: 'Détecteur IA gratuit pour texte et image | Atlas AI Detector',
    metaDescription: 'Analysez textes et images pour détecter les signaux de génération IA.',
    h1: 'Hub Détecteur IA',
    intro: 'Choisissez votre modalité pour analyser les signaux IA et contrôler la provenance.',
    toolType: 'hub',
    sections: [
      {
        h2: 'Un détecteur, trois vérifications',
        p: [
          'L’analyse d’image estime si une image a été produite par un modèle génératif et, si possible, de quelle famille de générateurs elle se rapproche. L’analyse de texte repère les motifs statistiques typiques des grands modèles de langage. Le vérificateur C2PA lit les Content Credentials localement dans votre navigateur.'
        ]
      }
    ],
    faq: [
      { q: 'Le service est-il gratuit ?', a: 'Oui. Les détecteurs publics sont gratuits, avec des limites d’usage raisonnable contre les abus.' }
    ]
  },
  'fr/detecteur-image-ia': {
    slug: 'fr/detecteur-image-ia',
    locale: 'fr',
    alt: 'ai-image-detector',
    title: 'Détecteur d’image IA gratuit | Atlas AI Detector',
    metaDescription: 'Importez une image et analysez les signaux de génération IA ainsi que les Content Credentials.',
    h1: 'Détecteur d’Image IA & Analyse IA',
    intro: 'Importez une image (JPG, PNG, WEBP max 4 Mo) pour analyser les signaux synthétiques.',
    toolType: 'image',
    sections: [
      {
        h2: 'Ce que vérifie le détecteur d’image',
        p: [
          'Le classifieur recherche les artefacts laissés par les modèles de diffusion et les GAN, et estime le générateur connu le plus proche (Midjourney, DALL·E, Flux, Stable Diffusion, Firefly…). En parallèle, votre navigateur lit les Content Credentials C2PA éventuels.',
          'Importez le fichier original si possible : captures d’écran, recompression, redimensionnement et filtres effacent les signaux utilisés par les détecteurs.'
        ]
      }
    ],
    faq: [
      { q: 'La compression ou les captures d’écran faussent-elles la détection ?', a: 'Oui. Elles modifient la distribution des pixels et réduisent la fiabilité.' },
      { q: 'Quels formats sont acceptés ?', a: 'JPG, PNG et WEBP jusqu’à 4 Mo.' }
    ]
  },
  'fr/detecteur-ia-texte': {
    slug: 'fr/detecteur-ia-texte',
    locale: 'fr',
    alt: 'ai-text-detector',
    title: 'Détecteur IA texte gratuit | Atlas AI Detector',
    metaDescription: 'Collez un texte pour analyser les signaux associés à la rédaction par IA.',
    h1: 'Détecteur de Texte IA',
    intro: 'Collez un texte pour analyser les motifs linguistiques. Limites de la bêta : 300 caractères minimum, 500 mots maximum.',
    toolType: 'text',
    sections: [
      {
        h2: 'Fonctionnement du détecteur de texte',
        p: [
          'Winston AI évalue le texte et renvoie un score humain global, converti ici en score de signal IA. Lorsque les scores des phrases suggèrent une rédaction mixte, la fiabilité baisse et le résultat peut être INDÉTERMINÉ.',
          'Les textes courts, les listes, les écrits très normés (juridique, technique) et les textes de non-natifs sont les principales sources de faux positifs.'
        ]
      }
    ],
    faq: [
      { q: 'Un détecteur de texte IA peut-il produire des faux positifs ?', a: 'Oui, surtout sur des textes courts ou techniques.' },
      { q: 'Quelle longueur de texte soumettre ?', a: '300 caractères minimum ; au-delà de 1 500 caractères l’analyse est plus fiable.' }
    ]
  },
  'fr/verificateur-content-credentials': {
    slug: 'fr/verificateur-content-credentials',
    locale: 'fr',
    alt: 'content-credentials-checker',
    title: 'Vérificateur Content Credentials et C2PA | Atlas AI Detector',
    metaDescription: 'Inspectez les Content Credentials C2PA directement dans votre navigateur.',
    h1: 'Vérificateur Content Credentials (C2PA)',
    intro: 'Inspectez les métadonnées C2PA directement dans votre navigateur.',
    toolType: 'c2pa',
    sections: [
      {
        h2: 'Que sont les Content Credentials ?',
        p: [
          'Les Content Credentials C2PA sont des manifestes signés intégrés au fichier, qui indiquent quel outil l’a créé ou modifié. Ce vérificateur lit le manifeste, le signataire et l’état de validation, et signale les déclarations de génération par IA.',
          'L’absence de manifeste est le cas normal pour la plupart des fichiers en ligne et n’indique pas qu’un contenu est d’origine humaine.'
        ]
      }
    ],
    faq: [
      { q: 'Mon fichier est-il envoyé à un serveur ?', a: 'Non. La vérification C2PA s’exécute dans votre navigateur.' }
    ]
  },
  'fr/detecteur-video-ia': {
    slug: 'fr/detecteur-video-ia',
    locale: 'fr',
    alt: 'ai-video-detector',
    title: 'Détecteur vidéo IA — Bêta | Atlas AI Detector',
    metaDescription: 'Analysez de courts clips MP4 avec Hive. Consultez les scores par image analysée et exportez le rapport.',
    h1: 'Détecteur Vidéo IA (Bêta)',
    intro: 'Analysez un clip MP4 de 4 Mo, 5 secondes et 60 images maximum. Bêta publique limitée à deux analyses vidéo par jour pour l’ensemble du service.',
    toolType: 'video',
    sections: [
      {
        h2: 'Comment fonctionne la détection vidéo',
        p: ['Hive analyse des images de la vidéo et renvoie des scores IA horodatés. Le rapport affiche le score maximal et le détail des images analysées. Il n’évalue pas l’audio et ne prouve pas l’origine de la vidéo.']
      }
    ],
    faq: [
      { q: 'Pourquoi l’analyse vidéo est-elle limitée ?', a: 'Le traitement image par image demande beaucoup de calcul et une vérification temporelle.' }
    ]
  },
  'fr/detecteur-deepfake': {
    slug: 'fr/detecteur-deepfake',
    locale: 'fr',
    alt: 'deepfake-detector',
    title: 'Détecteur de deepfake — Bêta | Atlas AI Detector',
    metaDescription: 'Comprenez la détection de manipulation faciale et inscrivez-vous à la bêta.',
    h1: 'Détecteur de Deepfake & Analyse IA',
    intro: 'La détection de deepfake se concentre sur les artéfacts d’alignement facial.',
    toolType: 'deepfake',
    sections: [
      {
        h2: 'Deepfake ou image générée ?',
        p: ['Un deepfake modifie ou remplace l’identité d’une personne réelle, souvent en vidéo. La détection évalue chaque visage détecté et doit être interprétée avec le contexte et la provenance.']
      }
    ],
    faq: []
  },
  'fr/confidentialite': {
    slug: 'fr/confidentialite',
    locale: 'fr',
    alt: 'privacy',
    title: 'Politique de Confidentialité | Atlas AI Detector',
    metaDescription: 'Politique de confidentialité d’Atlas AI Detector.',
    h1: 'Politique de Confidentialité',
    intro: 'Nous appliquons une politique stricte de minimisation des données.',
    toolType: 'privacy',
    sections: [
      {
        h2: 'Contenus analysés',
        p: [
          'Les images et vidéos sont transmises en HTTPS à Hive pour analyse. Lorsque la détection de texte est disponible, le texte est envoyé au prestataire configuré. Le contenu est ensuite abandonné par notre application. Nous ne les conservons pas et ne les utilisons pas pour de l’entraînement.',
          'L’inspection des Content Credentials (C2PA) s’exécute entièrement dans votre navigateur.'
        ]
      },
      {
        h2: 'Données techniques',
        p: ['Pour prévenir les abus, nous calculons une empreinte salée et irréversible de votre adresse IP et conservons des compteurs de courte durée (24 heures maximum). Les adresses IP brutes ne sont pas stockées. Des compteurs quotidiens agrégés (tentatives, analyses terminées, erreurs, inscriptions aux listes d’attente et redirections vers les partenaires) sont conservés jusqu’à 90 jours. Ces compteurs ne contiennent ni contenu soumis, ni adresse email, ni adresse IP. La protection anti-robots est fournie par Cloudflare Turnstile ; la mesure d’audience agrégée et sans cookie par Vercel Analytics.']
      },
      {
        h2: 'Comptes Atlas et connexion Google',
        p: ['La connexion Google demande votre adresse email et les informations de base de votre profil pour identifier votre compte Atlas. Elle ne demande aucun accès à vos messages Gmail ni à vos fichiers Google Drive. Supabase assure l’authentification et conserve les informations du compte. Des cookies de session permettent de rester connecté ; la déconnexion termine votre session Atlas.', 'La base des comptes peut conserver les opérations de crédits et les références, types, statuts et dates des analyses. Elle ne conserve pas les textes, images ou vidéos soumis. Les analyses terminées pour les comptes connectés sont enregistrées dans notre stockage de service protégé : référence, type, statut et date, sans leur contenu. La liste récente est limitée à 20 entrées, conservées jusqu’à 90 jours. Les crédits payants ne sont pas encore disponibles. Les comptes restent en bêta.']
      },
      {
        h2: 'Liste d’attente',
        p: ['Si vous rejoignez une liste d’attente, nous conservons votre adresse email et le produit choisi, uniquement pour vous contacter à ce sujet. Contact : contact.atlasforensics@gmail.com ; aucun lancement commercial n’est annoncé.']
      },
      {
        h2: 'Liens partenaires', p: ['Certaines pages contiennent des liens affiliés signalés comme tels. Atlas peut recevoir une commission sur les achats admissibles. Un clic ouvre un site externe, soumis à ses propres règles de confidentialité et de suivi. Atlas conserve uniquement un compteur agrégé de redirections ; aucun contenu analysé, email de compte ou référence de rapport n’est transmis par le lien.'] }, { h2: 'Vos droits',
        p: ['Vous pouvez demander l’accès, la rectification ou la suppression de vos données personnelles. Contact : contact.atlasforensics@gmail.com.']
      }
    ],
    faq: []
  },
  'fr/mentions-legales': {
    slug: 'fr/mentions-legales',
    locale: 'fr',
    alt: 'terms',
    title: 'Mentions Légales | Atlas AI Detector',
    metaDescription: 'Mentions légales et avertissement.',
    h1: 'Mentions Légales & Disclaimers',
    intro: 'Conditions d’utilisation et informations légales.',
    toolType: 'terms',
    sections: [
      {
        h2: 'Résultats probabilistes',
        p: ['Tous les résultats sont des estimations statistiques fournies en l’état, sans garantie. Ils ne constituent pas une preuve d’origine ou de paternité et ne doivent pas fonder seuls une décision disciplinaire, professionnelle, juridique ou financière.']
      },
      {
        h2: 'Usage autorisé',
        p: ['Vous devez disposer des droits sur les contenus soumis. Le scraping automatisé, le contournement des limites ou de la protection anti-robots et l’utilisation du service pour concevoir des outils d’évasion de détection sont interdits.']
      },
      {
        h2: 'Éditeur',
        p: ['Atlas AI Detector est un projet indépendant en bêta, édité par Youness Latifi. Contact : contact.atlasforensics@gmail.com. Les informations légales complémentaires restent à compléter avant tout lancement commercial. Hébergement : Vercel.']
      }
    ],
    faq: []
  }
};

export function pathFor(key: string): string {
  return '/' + key;
}

ROUTE_MAP['free-ai-detector-limits'] = {
  slug: 'free-ai-detector-limits', locale: 'en', alt: 'fr/limites-detecteur-ia-gratuit',
  title: 'Free AI detector: limits and planned Pro access | Atlas AI Detector',
  metaDescription: 'Understand Atlas free image, text and video limits, shared capacity and planned Pro features.',
  h1: 'Free access and planned Pro features', toolType: 'guide',
  intro: 'Use the free beta within its published limits. Paid access is not available yet.',
  sections: [
    { h2: 'Free beta limits', p: ['Per network address: up to 5 image attempts, 2 text attempts and 1 video attempt per UTC day. People sharing a network share these limits; this is not an individual account quota.', 'Text: at least 300 characters and at most 500 words. Video: non-fragmented MP4, at most 4 MB, 5 seconds and 60 frames. C2PA checks run locally without a server analysis quota.'] },
    { h2: 'Shared capacity', p: ['Global daily ceilings also apply: 90 Hive media attempts, including at most 2 video attempts, and 4 text attempts. Text also has a cumulative trial word budget. Availability can therefore end before your personal limit is reached.', 'Attempts may consume a quota even if the provider fails. These limits protect the trial credits and will be reviewed once usage is measured and funding is available.'] },
    { h2: 'Planned Pro access', p: ['Higher quotas, batch processing, saved reports and paid credits are planned. There is no checkout, subscription or paid service to purchase today. Join the Pro waitlist on a detector page to express interest.'] }
  ], faq: []
};
ROUTE_MAP['fr/limites-detecteur-ia-gratuit'] = {
  slug: 'fr/limites-detecteur-ia-gratuit', locale: 'fr', alt: 'free-ai-detector-limits',
  title: 'Détecteur IA gratuit : limites et futur accès Pro | Atlas AI Detector',
  metaDescription: 'Comprenez les limites gratuites d’Atlas pour les images, textes et vidéos, la capacité partagée et le futur accès Pro.',
  h1: 'Accès gratuit et futur accès Pro', toolType: 'guide',
  intro: 'Utilisez la bêta gratuite dans les limites indiquées. L’accès payant n’est pas encore disponible.',
  sections: [
    { h2: 'Limites de la bêta gratuite', p: ['Par adresse réseau : jusqu’à 5 tentatives image, 2 tentatives texte et 1 tentative vidéo par jour UTC. Les personnes sur un même réseau partagent ces limites ; il ne s’agit pas d’un quota individuel avec compte.', 'Texte : 300 caractères minimum, 500 mots maximum. Vidéo : MP4 non fragmenté, 4 Mo, 5 secondes et 60 images maximum. Les vérifications C2PA sont locales, sans quota d’analyse serveur.'] },
    { h2: 'Capacité partagée', p: ['Des plafonds quotidiens s’appliquent aussi à tout le site : 90 tentatives Hive pour les médias, dont 2 tentatives vidéo maximum, et 4 tentatives texte. Le texte dispose également d’un budget cumulé de mots pour l’essai. Le service peut donc atteindre sa capacité avant votre limite personnelle.', 'Une tentative peut compter même si le fournisseur échoue. Ces plafonds protègent les crédits d’essai ; ils seront revus après mesure des usages et financement.'] },
    { h2: 'Futur accès Pro', p: ['Des quotas supérieurs, le traitement par lots, les rapports sauvegardés et les crédits payants sont prévus. Aucun paiement ou abonnement n’est proposé aujourd’hui. La liste d’attente Pro sur les pages des détecteurs permet de manifester votre intérêt.'] }
  ], faq: []
};

ROUTE_MAP['how-to-read-ai-detector-results'] = {
  slug:'how-to-read-ai-detector-results',locale:'en',alt:'fr/comprendre-resultat-detecteur-ia',toolType:'guide',
  title:'How to interpret an AI detector score | Atlas AI Detector',metaDescription:'Understand AI scores, uncertainty, false positives and the checks to make before drawing a conclusion.',h1:'How to read an AI detector result',
  intro:'A detector provides an indicator. Context and independent evidence remain necessary.',
  sections:[
    {h2:'A score is not an authorship certificate',p:['Atlas displays the provider’s score. A high value indicates stronger AI-like patterns in the analyzed input, but it does not establish who created it. It is not a measured percentage of AI-written words.', 'Do not treat the result as proof. Review drafts, source material and revision history when they are available and shared with permission.']},
    {h2:'Why results can disagree',p:['Models and thresholds differ. Short passages, formulaic writing, translation and editing can affect results. A low score does not establish human origin, and a high score can be a false positive.']},
    {h2:'What the video report covers',p:['Atlas’s video beta shows the highest score among returned frames. It does not inspect every moment of a clip and does not analyze its audio. An unflagged sampled frame cannot validate the entire video.']}
  ],faq:[]
};
ROUTE_MAP['fr/comprendre-resultat-detecteur-ia'] = {
  slug:'fr/comprendre-resultat-detecteur-ia',locale:'fr',alt:'how-to-read-ai-detector-results',toolType:'guide',
  title:'Comment interpréter un score de détecteur IA | Atlas AI Detector',metaDescription:'Comprendre les scores IA, l’incertitude, les faux positifs et les vérifications utiles avant de conclure.',h1:'Comprendre un résultat de détecteur IA',
  intro:'Un détecteur fournit un indice. Le contexte et des éléments indépendants restent nécessaires.',
  sections:[
    {h2:'Un score ne certifie pas la paternité',p:['Atlas affiche le score du fournisseur. Un score élevé indique davantage de motifs associés à l’IA dans le contenu analysé, sans établir qui l’a créé. Il ne mesure pas un pourcentage de mots rédigés par IA.', 'Ne considérez pas ce résultat comme une preuve. Examinez les brouillons, les sources et l’historique des versions lorsqu’ils sont disponibles et partagés avec autorisation.']},
    {h2:'Pourquoi les résultats peuvent diverger',p:['Les modèles et leurs seuils diffèrent. Les textes courts, normés, traduits ou retravaillés peuvent modifier les résultats. Un score faible ne prouve pas une origine humaine ; un score élevé peut être un faux positif.']},
    {h2:'Ce que couvre le rapport vidéo',p:['La bêta vidéo d’Atlas affiche le score le plus élevé parmi les images renvoyées. Elle ne vérifie pas chaque instant du clip et n’analyse pas la piste audio. Une image échantillonnée sans signal ne valide pas toute la vidéo.']}
  ],faq:[]
};

export function getRoute(locale: Locale, slug?: string): RouteContent | undefined {
  const key = locale === 'fr' ? (slug ? `fr/${slug}` : 'fr') : slug || '';
  return ROUTE_MAP[key];
}

export function slugsFor(locale: Locale): string[] {
  return Object.values(ROUTE_MAP)
    .filter((r) => r.locale === locale && r.slug !== '' && r.slug !== 'fr')
    .map((r) => (locale === 'fr' ? r.slug.slice(3) : r.slug));
}

ROUTE_MAP["fr/choisir-detecteur-ia"] = {"slug":"fr/choisir-detecteur-ia","locale":"fr","alt":"choose-ai-detector","title":"Comment choisir un détecteur IA | Atlas AI Detector","metaDescription":"Choisissez selon le contenu, les limites et la confidentialité, plutôt qu’une promesse de précision.","h1":"Comment choisir un détecteur IA","intro":"Choisissez selon le contenu, les limites et la confidentialité, plutôt qu’une promesse de précision.","toolType":"guide","sections":[{"h2":"Commencer par son besoin","p":["Une vérification ponctuelle et un traitement quotidien de nombreux documents ne demandent pas la même solution. Définissez le format, la langue, la longueur et le volume avant de comparer les offres."]},{"h2":"Comparer les conditions réelles","p":["Vérifiez les limites gratuites, le renouvellement des crédits, le coût des dépassements et l’annulation. Une offre illimitée peut avoir des restrictions. Consultez les conditions actuelles du fournisseur avant de payer."]},{"h2":"Tester sur des exemples connus","p":["Essayez des contenus dont vous connaissez l’origine. Notez les fausses alertes, les contenus IA sans signal et les résultats incertains séparément. Un seul résultat convaincant ne mesure pas la précision générale."]},{"h2":"Confidentialité et Atlas","p":["Atlas envoie les médias à Hive et le texte au fournisseur configuré. C2PA est vérifié localement. Les comptes restent en bêta et les crédits payants ne sont pas disponibles. Nous n’avons pas réalisé de comparaison indépendante avec les autres détecteurs."]}],"faq":[]};
ROUTE_MAP["choose-ai-detector"] = {"slug":"choose-ai-detector","locale":"en","alt":"fr/choisir-detecteur-ia","title":"How to choose an AI detector | Atlas AI Detector","metaDescription":"Choose according to content, limits and privacy rather than a promised accuracy number.","h1":"How to choose an AI detector","intro":"Choose according to content, limits and privacy rather than a promised accuracy number.","toolType":"guide","sections":[{"h2":"Start with your task","p":["A one-off check and daily processing of many documents require different solutions. Identify format, language, length and volume before comparing offers."]},{"h2":"Compare actual conditions","p":["Check free limits, credit renewal, overage costs and cancellation. Unlimited offers can have restrictions. Read the provider’s current terms before paying."]},{"h2":"Test on known examples","p":["Try content whose origin you know. Record false alarms, AI examples with no signal and uncertain results separately. One convincing result does not establish general accuracy."]},{"h2":"Privacy and Atlas","p":["Atlas sends media to Hive and text to the configured provider. C2PA is checked locally. Accounts remain in beta and paid credits are unavailable. We have not performed an independent comparison with other detectors."]}],"faq":[]};
ROUTE_MAP["fr/preparer-image-analyse-ia"] = {"slug":"fr/preparer-image-analyse-ia","locale":"fr","alt":"prepare-image-ai-check","title":"Préparer une image avant une analyse IA | Atlas AI Detector","metaDescription":"Une méthode simple pour conserver les informations utiles et interpréter le résultat.","h1":"Préparer une image avant une analyse IA","intro":"Une méthode simple pour conserver les informations utiles et interpréter le résultat.","toolType":"guide","sections":[{"h2":"Conserver le fichier reçu","p":["Gardez une copie du fichier reçu avant de le modifier. Notez sa source et sa date de réception. Si possible, demandez le fichier original : une capture d’écran est une version différente."]},{"h2":"Vérifier le format","p":["Atlas accepte JPG, PNG et WEBP jusqu’à 4 Mo. Si vous devez convertir ou réduire le fichier, conservez aussi la version initiale et notez la modification. Ne comparez pas des versions différentes comme si elles étaient identiques."]},{"h2":"Séparer score et provenance","p":["Le score IA et les Content Credentials répondent à des questions différentes. Un score faible ne prouve pas une origine humaine. L’absence de credentials ne prouve pas une falsification. Conservez le rapport avec ses limites."]}],"faq":[]};
ROUTE_MAP["prepare-image-ai-check"] = {"slug":"prepare-image-ai-check","locale":"en","alt":"fr/preparer-image-analyse-ia","title":"Prepare an image for an AI check | Atlas AI Detector","metaDescription":"A simple workflow to preserve useful information and interpret the result.","h1":"Prepare an image for an AI check","intro":"A simple workflow to preserve useful information and interpret the result.","toolType":"guide","sections":[{"h2":"Keep the received file","p":["Keep a copy of the received file before editing it. Note its source and receipt date. If possible request the original: a screenshot is a different version."]},{"h2":"Check the format","p":["Atlas accepts JPG, PNG and WEBP up to 4 MB. If you must convert or resize a file, keep the initial version and record the change. Do not compare different versions as if they were identical."]},{"h2":"Separate score and provenance","p":["AI scores and Content Credentials answer different questions. A low score does not prove human origin. Missing credentials do not prove forgery. Keep the report and its limitations."]}],"faq":[]};
ROUTE_MAP["fr/texte-signale-ia-que-faire"] = {"slug":"fr/texte-signale-ia-que-faire","locale":"fr","alt":"text-flagged-ai-next-steps","title":"Mon texte est signalé IA : que faire ? | Atlas AI Detector","metaDescription":"Vérifiez le contexte et les preuves de rédaction avant toute conclusion.","h1":"Mon texte est signalé IA : que faire ?","intro":"Vérifiez le contexte et les preuves de rédaction avant toute conclusion.","toolType":"guide","sections":[{"h2":"Ne pas transformer un score en accusation","p":["Un détecteur peut produire une fausse alerte. Le score seul ne permet pas d’établir qui a écrit le texte. Une décision concernant une personne doit tenir compte d’autres éléments et permettre une explication."]},{"h2":"Rassembler les éléments utiles","p":["Conservez les brouillons, les notes, les sources et l’historique de rédaction disponibles. Vérifiez que le texte testé est bien la version concernée. Notez l’outil utilisé et la date du test."]},{"h2":"Utiliser Atlas dans ses limites","p":["Le texte doit respecter les limites indiquées par l’interface. Les quotas sont partagés par réseau et le budget d’essai est limité. Multiplier les tests ne transforme pas des résultats similaires en preuve indépendante."]}],"faq":[]};
ROUTE_MAP["text-flagged-ai-next-steps"] = {"slug":"text-flagged-ai-next-steps","locale":"en","alt":"fr/texte-signale-ia-que-faire","title":"My text was flagged as AI: what next? | Atlas AI Detector","metaDescription":"Review context and writing evidence before drawing conclusions.","h1":"My text was flagged as AI: what next?","intro":"Review context and writing evidence before drawing conclusions.","toolType":"guide","sections":[{"h2":"Do not turn a score into an accusation","p":["A detector can produce a false alarm. Its score alone does not establish who wrote the text. Decisions affecting a person need additional evidence and an opportunity to explain."]},{"h2":"Gather useful evidence","p":["Keep available drafts, notes, sources and writing history. Verify that the tested text is the relevant version. Record the tool and test date."]},{"h2":"Use Atlas within its limits","p":["Text must satisfy the limits shown in the interface. Quotas are shared by network and the trial budget is limited. Repeated tests do not turn similar results into independent evidence."]}],"faq":[]};

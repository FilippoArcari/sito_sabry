const fs = require('fs');
const path = require('path');

const publicDir = '/home/filippo/filippo/progettiPersonali/sito_sabry/public';
const routeTsPath = path.join(publicDir, '../app/api/route.ts');

function getFiles(dir) {
  try {
    return fs.readdirSync(path.join(publicDir, dir)).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.JPG'));
  } catch(e) { return []; }
}

const concertiArtisti = [
  { name: 'Joan Thiele', folder: 'concerti/artisti/Joan Thiele ' },
  { name: 'King Krule', folder: 'concerti/artisti/KING KRULE - unica data italiana' },
  { name: 'Altin Gun', folder: 'concerti/artisti/ALTIN GUN ' },
  { name: 'Franco 126', folder: 'concerti/artisti/Franco 126' },
  { name: 'L\\'IMPERATRICE', folder: 'concerti/artisti/L_IMPERATRICE' },
  { name: 'POP X', folder: 'concerti/artisti/POP X' },
  { name: 'SAYF E DIBLA', folder: 'concerti/artisti/SAYF E DIBLA' },
  { name: 'Confidence Man', folder: 'concerti/artisti/Confidence Man ' }
].map(a => {
  const files = getFiles(a.folder);
  return {
    event_name: a.name,
    folder: a.folder,
    cover: files[0] || '',
    files: files
  };
}).filter(a => a.files.length > 0);

const festivalBlocks = [
  {
    name: 'Poplar Festival',
    subtitle: 'atmosphere and people',
    folder: 'POPLAR - atmosphere and people',
  },
  {
    name: 'Eden Festival',
    subtitle: '',
    folder: 'concerti/eden',
  }
].map(f => {
  const files = getFiles(f.folder);
  return {
    name: f.name,
    subtitle: f.subtitle,
    folder: f.folder,
    cover: files[0] || '',
    files: files
  };
});

const eventi = [
  { name: 'Coscienza Festival', folder: 'Co.Scienza Festival' },
  { name: 'Skygarden Tournament', folder: 'Skygarden Tournament' },
  { name: 'Shakedown SF-26', folder: 'Shakedown SF-26' }
].map(e => {
  const files = getFiles(e.folder);
  return {
    name: e.name,
    folder: e.folder,
    cover: files[0] || '',
    files: files
  };
});

let content = fs.readFileSync(routeTsPath, 'utf8');

// We replace pieces in the structure by rebuilding the JS object textually to avoid regex complexity
let newStr = `
export const DATA_STRUCTURE = {
    Home: {
        main_title: "Home Page",
        about: {
            title: "Chi sono",
            text: "Mi chiamo Sabrina Arciprete, e sono una fotografa specializzata in live music ed eventi.\\nIl palco è sempre stato parte del mio percorso: dalla danza alle produzioni teatrali, fino al cinema e ai concerti. L'ho vissuto da dentro, prima ancora di raccontarlo attraverso un obiettivo.\\nOsservare la scena da ogni angolazione mi ha insegnato a coglierne l'energia, i dettagli e la tensione emotiva. Oggi trasformo quell'esperienza in immagini che raccontano identità, atmosfera e presenza.",
        },
        formation: {
            title: "Il mio percorso",
            text: "Dal 2020 ho intrapreso un percorso di formazione fotografica affiancando professionisti del settore e lavorando in contesti differenti, dalle cerimonie agli eventi dinamici e live.\\nNel 2022 ho iniziato un percorso in regia cinematografica presso la scuola d'arte drammatica Estro Teatro di Trento, approfondendo la narrazione visiva e producendo due cortometraggi.\\nQuesta formazione mi permette di affrontare ogni progetto con uno sguardo strutturato, narrativo e consapevole.",
        },
    },
    Concerti: {
        main_title: "Concerti e Festival",
        images: ${JSON.stringify(concertiArtisti, null, 12)},
        festival_blocks: ${JSON.stringify(festivalBlocks, null, 12)}
    },
    Eventi: {
        main_title: "Eventi",
        items: ${JSON.stringify(eventi, null, 12)}
    },
    Contatti: {
        email: "sabrinarci13@gmail.com",
        instagram: "@shot_arci",
        instagram_url: "https://www.instagram.com/shot_arci",
        linkedin: "Sabrina Arciprete",
        linkedin_url: "https://www.linkedin.com/in/sabrina-arciprete",
        location: "Trento, disponibile per trasferte nazionali e internazionali",
        description: "Disponibile per concerti, tour, festival e progetti editoriali. Contattami per collaborazioni professionali o per discutere del tuo progetto.",
    },
}

export function GET(request: Request) {
    return new Response(JSON.stringify(DATA_STRUCTURE));
}
`;

fs.writeFileSync(routeTsPath, newStr);
console.log('Update successful');

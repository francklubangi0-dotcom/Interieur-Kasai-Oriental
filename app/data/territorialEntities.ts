export type CommuneRecord = {
  name: string;
  mayor: string | null;
  deputyMayor: string | null;
  address: string | null;
  areaKm2: number | null;
  populationEstimate: number | null;
};

export type TerritorialEntity = {
  slug: string;
  name: string;
  kind: 'Ville' | 'Territoire';
  administratorTitle: string;
  administrator: string | null;
  administratorSource: string | null;
  administratorNote: string | null;
  deputyAdministrator: string | null;
  areaKm2: number | null;
  populationEstimate: number | null;
  contactPhone: string | null;
  contactEmail: string | null;
  communes: CommuneRecord[];
};

const cityCommunes: CommuneRecord[] = [
  { name: 'Bipemba', mayor: null, deputyMayor: null, address: null, areaKm2: null, populationEstimate: null },
  { name: 'Dibindi', mayor: null, deputyMayor: null, address: null, areaKm2: null, populationEstimate: null },
  { name: 'Diulu', mayor: null, deputyMayor: null, address: null, areaKm2: null, populationEstimate: null },
  { name: 'Kanshi', mayor: null, deputyMayor: null, address: null, areaKm2: null, populationEstimate: null },
  { name: 'Muya', mayor: null, deputyMayor: null, address: null, areaKm2: null, populationEstimate: null },
];

export const territorialEntities: TerritorialEntity[] = [
  {
    slug: 'mbuji-mayi',
    name: 'Ville de Mbuji-Mayi',
    kind: 'Ville',
    administratorTitle: 'Maire de la ville',
    administrator: null,
    administratorSource: null,
    administratorNote: null,
    deputyAdministrator: null,
    areaKm2: null,
    populationEstimate: null,
    contactPhone: null,
    contactEmail: null,
    communes: cityCommunes,
  },
  {
    slug: 'kabeya-kamwanga',
    name: 'Territoire de Kabeya-Kamwanga',
    kind: 'Territoire',
    administratorTitle: 'Administrateur du territoire · dernière information publique',
    administrator: 'Willy Mulamba Mbiye',
    administratorSource: 'https://etoilenews.net/2026/02/11/kasai-oriental-apres-pres-dun-an-de-suspension-trois-administrateurs-de-territoire-officiellement-notifies-pour-la-reprise-de-leurs-fonctions/',
    administratorNote: 'Réintégration rapportée le 11 février 2026.',
    deputyAdministrator: null,
    areaKm2: null,
    populationEstimate: null,
    contactPhone: null,
    contactEmail: null,
    communes: [],
  },
  {
    slug: 'katanda',
    name: 'Territoire de Katanda',
    kind: 'Territoire',
    administratorTitle: 'Administrateur du territoire · dernière information publique',
    administrator: 'Aaron Mbuyi Bukasa',
    administratorSource: 'https://etoilenews.net/2026/02/11/kasai-oriental-apres-pres-dun-an-de-suspension-trois-administrateurs-de-territoire-officiellement-notifies-pour-la-reprise-de-leurs-fonctions/',
    administratorNote: 'Réintégration rapportée le 11 février 2026.',
    deputyAdministrator: null,
    areaKm2: null,
    populationEstimate: null,
    contactPhone: null,
    contactEmail: null,
    communes: [],
  },
  {
    slug: 'lupatapata',
    name: 'Territoire de Lupatapata',
    kind: 'Territoire',
    administratorTitle: 'Administrateur du territoire',
    administrator: null,
    administratorSource: null,
    administratorNote: null,
    deputyAdministrator: null,
    areaKm2: null,
    populationEstimate: null,
    contactPhone: null,
    contactEmail: null,
    communes: [],
  },
  {
    slug: 'miabi',
    name: 'Territoire de Miabi',
    kind: 'Territoire',
    administratorTitle: 'Administrateur du territoire · dernière information publique',
    administrator: 'Pierre Tshibasu Bashiya',
    administratorSource: 'https://etoilenews.net/2026/02/11/kasai-oriental-apres-pres-dun-an-de-suspension-trois-administrateurs-de-territoire-officiellement-notifies-pour-la-reprise-de-leurs-fonctions/',
    administratorNote: 'Réintégration rapportée le 11 février 2026.',
    deputyAdministrator: null,
    areaKm2: null,
    populationEstimate: null,
    contactPhone: null,
    contactEmail: null,
    communes: [],
  },
  {
    slug: 'tshilenge',
    name: 'Territoire de Tshilenge',
    kind: 'Territoire',
    administratorTitle: 'Administrateur du territoire',
    administrator: null,
    administratorSource: null,
    administratorNote: null,
    deputyAdministrator: null,
    areaKm2: null,
    populationEstimate: null,
    contactPhone: null,
    contactEmail: null,
    communes: [],
  },
];


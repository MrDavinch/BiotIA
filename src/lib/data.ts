export const atlasData = {
  general: [
    {
      id: 1,
      species: "Epithelial Cells",
      magnification: "40x",
      staining: "Pap",
      author: "Dr. Anya Sharma",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "cell biology",
    },
  ],
  micologia: [
    {
      id: 1,
      species: "Aspergillus fumigatus",
      magnification: "400x",
      staining: "Lactophenol Cotton Blue",
      author: "Dr. Ben Carter",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "fungus microscope"
    },
    {
      id: 2,
      species: "Candida albicans",
      magnification: "1000x (Oil)",
      staining: "Gram",
      author: "Dr. Chloe Davis",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "yeast cells"
    },
  ],
  parasitologia: [
    {
      id: 1,
      species: "Giardia lamblia",
      magnification: "500x",
      staining: "Trichrome",
      author: "Dr. David Smith",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "parasite microscope"
    },
  ],
  bacteriologia: [
    {
      id: 1,
      species: "Staphylococcus aureus",
      magnification: "1000x (Oil)",
      staining: "Gram",
      author: "Dr. Emily White",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "bacteria microscope"
    },
  ],
  hematologia: [
    {
      id: 1,
      species: "Sickle Cells",
      magnification: "1000x",
      staining: "Wright-Giemsa",
      author: "Dr. Frank Miller",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "blood cells"
    },
  ],
  uroanalisis: [
    {
      id: 1,
      species: "Calcium Oxalate Crystals",
      magnification: "400x",
      staining: "Unstained",
      author: "Dr. Grace Lee",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "urine crystals"
    },
  ],
  coproanalisis: [
    {
      id: 1,
      species: "Ascaris lumbricoides egg",
      magnification: "400x",
      staining: "Iodine",
      author: "Dr. Henry Wilson",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "parasite egg"
    },
  ],
  "citologia-histologia": [
     {
      id: 1,
      species: "Cervical Squamous Cells",
      magnification: "200x",
      staining: "Papanicolaou",
      author: "Dr. Isabella Garcia",
      imageUrl: "https://placehold.co/400x400.png",
      aiHint: "cytology slide"
    },
  ],
};

export const communityFeedData = [
  {
    id: 1,
    user: {
      name: "Dr. Alex Rodriguez",
      avatarUrl: "https://placehold.co/100x100.png",
    },
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "bacteria culture",
    description: "Interesting case of a mixed bacterial culture from a wound swab. The Gram stain shows both GPC in clusters and GNR. Any thoughts on initial identification?",
    likes: 15,
    comments: 4,
  },
  {
    id: 2,
    user: {
      name: "Maria Flores",
      avatarUrl: "https://placehold.co/100x100.png",
    },
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "blood smear",
    description: "Found these unusual inclusions in red blood cells. Peripheral smear from a patient with recent travel to a malaria-endemic area. Suspecting Plasmodium falciparum.",
    likes: 22,
    comments: 8,
  },
];

export const userProfileData = {
    name: "Dr. Evelyn Reed",
    specialty: "Clinical Microbiologist",
    institution: "Metro Health Institute",
    avatarUrl: "https://placehold.co/150x150.png",
    stats: {
        sharedCases: 34,
        diagnosticsRequested: 112,
    },
    uploads: [
        { id: 1, imageUrl: 'https://placehold.co/400x400.png', aiHint: 'microscope slide', diagnosis: 'Streptococcus' },
        { id: 2, imageUrl: 'https://placehold.co/400x400.png', aiHint: 'cell culture', diagnosis: 'Yeast contamination' },
        { id: 3, imageUrl: 'https://placehold.co/400x400.png', aiHint: 'parasite sample', diagnosis: 'Entamoeba histolytica' },
        { id: 4, imageUrl: 'https://placehold.co/400x400.png', aiHint: 'histology tissue', diagnosis: 'Normal epithelial tissue' },
    ]
}

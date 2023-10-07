export const livros_biblia: Record<string, string> = {
    // Antigo Testamento
    "gênesis": "Gn",
    "êxodo": "Êx",
    "levítico": "Lv",
    "números": "Nm",
    "deuteronômio": "Dt",
    "josué": "Js",
    "juízes": "Jz",
    "rute": "Rt",
    "1 samuel": "1Sm",
    "2 samuel": "2Sm",
    "1 reis": "1Rs",
    "2 reis": "2Rs",
    "1 crônicas": "1Cr",
    "2 crônicas": "2Cr",
    "esdras": "Ed",
    "neemias": "Ne",
    "ester": "Et",
    "jó": "Jó",
    "salmos": "Sl",
    "provérbios": "Pv",
    "eclesiastes": "Ec",
    "cantares de salomão": "Ct",
    "isaías": "Is",
    "jeremias": "Jr",
    "lamentações": "Lm",
    "ezequiel": "Ez",
    "daniel": "Dn",
    "oseias": "Os",
    "joel": "Jl",
    "amós": "Am",
    "obadias": "Ob",
    "jonas": "Jn",
    "miquéias": "Mq",
    "naum": "Na",
    "habacuque": "Hc",
    "sofonias": "Sf",
    "ageu": "Ag",
    "zacarias": "Zc",
    "malaquias": "Ml",

    // Novo Testamento
    "mateus": "Mt",
    "marcos": "Mc",
    "lucas": "Lc",
    "joão": "Jo",
    "atos": "At",
    "romanos": "Rm",
    "1 coríntios": "1Co",
    "2 coríntios": "2Co",
    "gálatas": "Gl",
    "efésios": "Ef",
    "filipenses": "Fp",
    "colossenses": "Cl",
    "1 tessalonicenses": "1Ts",
    "2 tessalonicenses": "2Ts",
    "1 timóteo": "1Tm",
    "2 timóteo": "2Tm",
    "tito": "Tt",
    "filemon": "Fm",
    "hebreus": "Hb",
    "tiago": "Tg",
    "1 pedro": "1Pe",
    "2 pedro": "2Pe",
    "1 joão": "1Jo",
    "2 joão": "2Jo",
    "3 joão": "3Jo",
    "judas": "Jd",
    "apocalipse": "Ap"
}

export function livro_para_abreviacao(nome_livro: string): string {
    return livros_biblia[nome_livro.toLowerCase()] || "Livro não encontrado";
}
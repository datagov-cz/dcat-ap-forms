import * as http from "@/app-service/http";
import {importDataset} from "./import-from-url";
import {exportToJsonLd} from "./edit/export-dataset-edit";
import {getRemoteJson} from "@/app-service/http";
import {createDistribution} from "./edit/distribution-model";
import {createDataset} from "./edit/dataset-model";

/*const DEREFERENCE_REMOTE_SOURCE = {
  "https://katalog-mdcr/a86": {
    "@graph": [
      {
        "@id": "https://katalog-mdcr/a86",
        "@type": [
          "http://www.w3.org/ns/dcat#Dataset",
          "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/DcatLkod"
        ],
        "http://purl.org/dc/terms/title": {
          "@value": "Seznam dopravců veřejné osobní dopravy obsažených v CIS JŘ",
          "@language": "cs"
        },
        "http://purl.org/dc/terms/description": {
          "@value": "Obsahem datové sady je ....",
          "@language": "cs"
        },
        "http://purl.org/dc/terms/identifier": {
          "@value": "https://data.gov.cz/lkod/mdcr/datové-sady/seznam-dopravci",
          "@type": "http://www.w3.org/2001/XMLSchema#anyURI"
        },
        "http://xmlns.com/foaf/0.1/page": {
          "@id": "https://www.mdcr.cz/Dokumenty/Verejna-doprava/Jizdni-rady,-kalendare-pro-jizdni-rady,-metodi-(1)/Jizdni-rady-verejne-dopravy"
        },
        "http://purl.org/dc/terms/publisher": {
          "@id": "https://data.gov.cz/zdroj/ovm/MDopravy"
        },
        "http://purl.org/dc/terms/spatial": [
          {"@id": "http://publications.europa.eu/resource/authority/country/CZE"},
          {"@id": "https://linked.cuzk.cz/resource/ruian/stat/1"}
        ],
        "http://www.w3.org/ns/dcat#contactPoint": {
          "@id": "https://katalog-mdcr/a86/kontaktní-bod"
        },
        "http://www.w3.org/ns/dcat#distribution": {
          "@id": "https://katalog-mdcr/a86/distribuce/25"
        },
        "http://purl.org/dc/terms/accrualPeriodicity": {
          "@id": "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3"
        },
        "http://www.w3.org/ns/dcat#keyword": [
          {"@value": "dopravce", "@language": "cs"},
          {"@value": "jízdní řády", "@language": "cs"},
          {"@value": "drážní doprava", "@language": "cs"},
          {"@value": "veřejná linková doprava", "@language": "cs"},
          {"@value": "městská doprava", "@language": "cs"},
          {"@value": "CIS JŘ", "@language": "cs"}
        ],
        "http://www.w3.org/ns/dcat#theme": [
          {"@id": "http://publications.europa.eu/resource/authority/data-theme/TRAN"},
          {"@id": "http://eurovoc.europa.eu/4512"}
        ]
      }
    ]
  },
  "https://katalog-mdcr/a86/kontaktní-bod": {
    "@graph": [
      {
        "@id": "https://katalog-mdcr/a86/kontaktní-bod",
        "@type": "http://www.w3.org/2006/vcard/ns#Organization",
        "http://www.w3.org/2006/vcard/ns#fn": {
          "@value": "Ministerstvo dopravy, Odbor veřejné dopravy",
          "@language": "cs"
        },
        "http://www.w3.org/2006/vcard/ns#hasEmail": "sekretariat.190@mdcr.cz"
      }
    ]
  },
  "https://katalog-mdcr/a86/distribuce/25": {
    "@graph": [
      {
        "@id": "https://katalog-mdcr/a86/distribuce/25",
        "@type": "http://www.w3.org/ns/dcat#Distribution",
        "http://purl.org/dc/terms/format": {"@id": "http://publications.europa.eu/resource/authority/file-type/CSV"},
        "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": {"@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"},
        "https://data.gov.cz/slovník/podmínky-užití/specifikace": {"@id": "https://katalog-mdcr/a86/podmínky-užití"},
        "http://www.w3.org/ns/dcat#downloadURL": {"@id": "ftp://ftp.cisjr.cz/seznamy/dopravci.csv"},
        "http://www.w3.org/ns/dcat#mediaType": {"@id": "http://www.iana.org/assignments/media-types/text/csv"},
        "http://www.w3.org/ns/dcat#accessURL": {"@id": "ftp://ftp.cisjr.cz/seznamy/dopravci.csv"}
      }
    ]
  },
  "https://katalog-mdcr/a86/podmínky-užití": {
    "@graph": [
      {
        "@id": "https://katalog-mdcr/a86/podmínky-užití",
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {"@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"},
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {"@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"},
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {"@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"},
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {"@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"}
      }
    ]
  }
};

// Construct data for a single fetch request.

const ALL_IN_ONE_REMOTE_SOURCE = {
  "https://katalog-mdcr/a86/all": {
    "@graph": [
      DEREFERENCE_REMOTE_SOURCE["https://katalog-mdcr/a86"]["@graph"][0],
      ...DEREFERENCE_REMOTE_SOURCE["https://katalog-mdcr/a86/kontaktní-bod"]["@graph"],
      ...DEREFERENCE_REMOTE_SOURCE["https://katalog-mdcr/a86/distribuce/25"]["@graph"],
      ...DEREFERENCE_REMOTE_SOURCE["https://katalog-mdcr/a86/podmínky-užití"]["@graph"]
    ]
  }
};
*/
let REMOTE_SOURCE;

http.getRemoteJson = (url) => {
  for (let key in REMOTE_SOURCE) {
    if (!REMOTE_SOURCE.hasOwnProperty(key)) {
      continue;
    }
    if (url === key) {
      return Promise.resolve({"json": REMOTE_SOURCE[key]});
    }
  }
  return Promise.reject({"error": "Request for: " + url});
};

/*const EXPECTED_DATASET = {
  "iri": "https://katalog-mdcr/a86",
  "title": "Seznam dopravců veřejné osobní dopravy obsažených v CIS JŘ",
  "description": "Obsahem datové sady je ....",
  "accrual_periodicity": "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3",
  "ruian_type": "https://linked.cuzk.cz/ontology/ruian/TypPrvku/ST",
  "ruian": "https://linked.cuzk.cz/resource/ruian/stat/1",
  "documentation": "https://www.mdcr.cz/Dokumenty/Verejna-doprava/Jizdni-rady,-kalendare-pro-jizdni-rady,-metodi-(1)/Jizdni-rady-verejne-dopravy",
  "keywords": ["dopravce", "jízdní řády", "drážní doprava", "veřejná linková doprava", "městská doprava", "CIS JŘ"],
  "temporal_start": "",
  "temporal_end": "",
  "contact_point_name": "Ministerstvo dopravy, Odbor veřejné dopravy",
  "contact_point_email": "sekretariat.190@mdcr.cz",
  "dataset_theme": "http://publications.europa.eu/resource/authority/data-theme/TRAN",
  "themes": ["http://eurovoc.europa.eu/4512"],
};
const EXPECTED_DISTRIBUTION = {
  "license_author_type": "NO",
  "license_author_name": "",
  "license_author_custom": "",
  "license_db_type": "NO",
  "license_db_name": "",
  "license_db_custom": "",
  "license_specialdb_type": "NO",
  "license_specialdb_custom": "",
  "license_personal_type": "NO",
  "url": "ftp://ftp.cisjr.cz/seznamy/dopravci.csv",
  "format": "http://publications.europa.eu/resource/authority/file-type/CSV",
  "media_type": "http://www.iana.org/assignments/media-types/text/csv",
  "schema": "",
  "title": ""
};

test("Load by dereference.", () => {
  REMOTE_SOURCE = DEREFERENCE_REMOTE_SOURCE;
  const promise = importDataset("https://katalog-mdcr/a86");
  return promise.then((actual) => {
    const distributions = Object.values(actual.distributions);
    expect(actual.dataset).toEqual(EXPECTED_DATASET);
    expect(distributions.length).toBe(1);
    expect(distributions[0]).toEqual(EXPECTED_DISTRIBUTION);
  });
});

test("Load from single request.", () => {
  REMOTE_SOURCE  = ALL_IN_ONE_REMOTE_SOURCE;
  const promise = importDataset("https://katalog-mdcr/a86/all");
  return promise.then((actual) => {
    const distributions = Object.values(actual.distributions);
    expect(actual.dataset).toEqual(EXPECTED_DATASET);
    expect(distributions.length).toBe(1);
    expect(distributions[0]).toEqual(EXPECTED_DISTRIBUTION);
  });
});*/
//====
// import, then export
let loaderTest = (iri) => {
  return new Promise((resolve, reject) => {
    let dataset = createDataset();
    let distributions = [createDistribution()];
    importDataset(iri, "cs", {}, dataset, distributions).then((result) => {
      console.log("*** Imported ***");
      console.log(result.dataset);
      console.log(result.distributions);
      console.log("*** Exporting ***");
      const exported = exportToJsonLd(result.dataset, result.distributions);
      console.log(JSON.stringify(exported));
      resolve(JSON.parse(JSON.stringify(exported, null, 2))); //to emulate download
    });
  });
}

let testRunner = (srcIri, expected, done) => {
  loaderTest(srcIri).then((output) => {
    expect(output).toEqual(expected);
    done();
  });
}
const BYLANY = { "@graph": [
  { "@id": "https://data.gov.cz/zdroj/katalog/NKOD",
    "http://www.w3.org/ns/dcat#record": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/z\u00E1znam"},
    "http://www.w3.org/ns/dcat#dataset": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670"} },
  { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2",
    "@type": "http://www.w3.org/ns/dcat#Distribution",
    "https://data.gov.cz/slovn\u00EDk/nkod/mediaType": "application/pdf",
    "https://data.gov.cz/slovn\u00EDk/nkod/typ-\u00FAlo\u017Ei\u0161t\u011B-datov\u00E9-sady/typ\u00DAlo\u017Ei\u0161t\u011B": { "@id": "https://data.gov.cz/slovn\u00EDk/nkod/typ-\u00FAlo\u017Ei\u0161t\u011B-datov\u00E9-sady/Web"},
    "https://data.gov.cz/slovn\u00EDk/podm\u00EDnky-u\u017Eit\u00ED/specifikace": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2/podm\u00EDnky-u\u017Eit\u00ED"},
    "http://www.w3.org/ns/dcat#downloadURL": { "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyn\u011B%20v%20M\u0160%20III%20etapa.pdf"},
    "http://www.w3.org/ns/dcat#accessURL": { "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyn\u011B%20v%20M\u0160%20III%20etapa.pdf"} },
  { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/kontaktn\u00ED-bod",
    "@type": [ "http://www.w3.org/2006/vcard/ns#Kind",
      "http://www.w3.org/2006/vcard/ns#Individual" ],
    "http://www.w3.org/2006/vcard/ns#fn": "Jan M\u00E1lek,starosta",
    "http://www.w3.org/2006/vcard/ns#hasEmail": "ou.bylany@worldonline.cz" },
  { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/z\u00E1znam",
    "@type": "http://www.w3.org/ns/dcat#CatalogRecord",
    "http://purl.org/dc/terms/modified": { "@value" : "2017-08-22T00:00:00" , "@type" : "http://www.w3.org/2001/XMLSchema#dateTime" },
    "http://purl.org/dc/terms/language": { "@id": "http://publications.europa.eu/resource/authority/language/CES"},
    "http://purl.org/dc/terms/conformsTo": { "@id": "https://joinup.ec.europa.eu/release/dcat-ap/12"},
    "http://purl.org/dc/terms/issued": { "@value" : "2017-08-22T00:00:00" , "@type" : "http://www.w3.org/2001/XMLSchema#dateTime" },
    "http://xmlns.com/foaf/0.1/primaryTopic": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670"} },
  { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/\u010Dasov\u00E9-pokryt\u00ED",
    "@type": "http://purl.org/dc/terms/PeriodOfTime",
    "http://schema.org/endDate": { "@value" : "2017-08-31" , "@type" : "http://www.w3.org/2001/XMLSchema#date" },
    "http://schema.org/startDate": { "@value" : "2017-06-01" , "@type" : "http://www.w3.org/2001/XMLSchema#date" } },
  { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2/podm\u00EDnky-u\u017Eit\u00ED",
    "@type": "https://data.gov.cz/slovn\u00EDk/podm\u00EDnky-u\u017Eit\u00ED/Specifikace",
    "https://data.gov.cz/slovn\u00EDk/podm\u00EDnky-u\u017Eit\u00ED/autorsk\u00E9-d\u00EDlo": { "@id": "https://data.gov.cz/podm\u00EDnky-u\u017Eit\u00ED/neobsahuje-autorsk\u00E1-d\u00EDla/"},
    "https://data.gov.cz/slovn\u00EDk/podm\u00EDnky-u\u017Eit\u00ED/datab\u00E1ze-chr\u00E1n\u011Bn\u00E1-zvl\u00E1\u0161tn\u00EDmi-pr\u00E1vy": { "@id": "https://data.gov.cz/podm\u00EDnky-u\u017Eit\u00ED/nen\u00ED-chr\u00E1n\u011Bna-zvl\u00E1\u0161tn\u00EDm-pr\u00E1vem-po\u0159izovatele-datab\u00E1ze/"},
    "https://data.gov.cz/slovn\u00EDk/podm\u00EDnky-u\u017Eit\u00ED/datab\u00E1ze-jako-autorsk\u00E9-d\u00EDlo": { "@id": "https://data.gov.cz/podm\u00EDnky-u\u017Eit\u00ED/nen\u00ED-autorskopr\u00E1vn\u011B-chr\u00E1n\u011Bnou-datab\u00E1z\u00ED/"},
    "https://data.gov.cz/slovn\u00EDk/podm\u00EDnky-u\u017Eit\u00ED/osobn\u00ED-\u00FAdaje": { "@id": "https://data.gov.cz/podm\u00EDnky-u\u017Eit\u00ED/neobsahuje-osobn\u00ED-\u00FAdaje/"} },
  { "@id": "https://data.gov.cz/zdroj/ovm/00269905",
    "@type": "http://xmlns.com/foaf/0.1/Agent",
    "http://xmlns.com/foaf/0.1/name": "Obec Bylany" },
  { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670",
    "@type": [ "http://www.w3.org/ns/dcat#Dataset",
      "https://data.gov.cz/slovn\u00EDk/nkod/typ-datov\u00E9-sady-dle-zdroje/Formul\u00E1\u0159" ],
    "http://purl.org/dc/terms/modified": { "@value" : "2017-08-22T00:00:00" , "@type" : "http://www.w3.org/2001/XMLSchema#dateTime" },
    "http://purl.org/dc/terms/title": "Obec Bylany",
    "http://purl.org/dc/terms/description": "Oprava kuchyn\u011B v M\u0160-III.etapa",
    "http://purl.org/dc/terms/identifier": [ "https://data.gov.cz/zdroj/datov\u00E9-sady/qmsa4he/243671670",
      "243671670" ],
    "http://purl.org/dc/terms/publisher": { "@id": "https://data.gov.cz/zdroj/ovm/00269905"},
    "http://purl.org/dc/terms/spatial": { "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"},
    "http://purl.org/dc/terms/issued": { "@value" : "2017-08-22T00:00:00" , "@type" : "http://www.w3.org/2001/XMLSchema#dateTime" },
    "http://www.w3.org/ns/dcat#contactPoint": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/kontaktn\u00ED-bod"},
    "http://www.w3.org/ns/dcat#distribution": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/distribuce/95ef5f639b386aa769c3e38125c116e2"},
    "http://purl.org/dc/terms/accrualPeriodicity": { "@id": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT"},
    "http://purl.org/dc/terms/temporal": { "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/Bylany/243671670/\u010Dasov\u00E9-pokryt\u00ED"},
    "http://www.w3.org/ns/dcat#keyword": "obec Bylany" }
] };

const BYLANY_DS = {
  "https://data.eghuro.cz/dump/bylany.json" : BYLANY
}

test("Bylany", done => {
  REMOTE_SOURCE = BYLANY_DS;
  const srcIri = "https://data.eghuro.cz/dump/bylany.json";
  const expected = {
    "@id": "_:ds",
    "@type": [
      "http://www.w3.org/ns/dcat#Dataset",
      "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
    ],
    "http://purl.org/dc/terms/title": [
      {
        "@language": "cs",
        "@value": "Obec Bylany"
      }
    ],
    "http://purl.org/dc/terms/description": [
      {
        "@language": "cs",
        "@value": "Oprava kuchyně v MŠ-III.etapa"
      }
    ],
    "http://www.w3.org/ns/dcat#distribution": [
      {
        "@type": "http://www.w3.org/ns/dcat#Distribution",
        "http://www.w3.org/ns/dcat#downloadURL": {
          "@id": "https://data.gov.cz/soubor/nkod/Obec%20Bylany,%20Jan%20Krupka%20SoD%201001%2017%20%20Oprava%20kuchyně%20v%20MŠ%20III%20etapa.pdf"
        },
        "http://www.w3.org/ns/dcat#mediaType": {
          "@id": null
        },
        "http://purl.org/dc/terms/format": {
          "@id": null
        },
        "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
          "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
          "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
            "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
          },
          "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
            "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
          },
          "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
            "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
          },
          "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
            "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
          }
        }
      }
    ],
    "http://www.w3.org/ns/dcat#keyword": [
      [
        {
          "@language": "cs",
          "@value": "obec Bylany"
        }
      ]
    ],
    "http://purl.org/dc/terms/accrualPeriodicity": {
      "@id": "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT"
    },
    "http://purl.org/dc/terms/spatial": [
      {
        "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
      }
    ],
    "http://www.w3.org/ns/dcat#theme": [],
    "http://purl.org/dc/terms/temporal": {
      "@type": [
        "http://purl.org/dc/terms/PeriodOfTime"
      ],
      "http://www.w3.org/ns/dcat#startDate": {
        "@type": "http://www.w3.org/2001/XMLSchema#date",
        "@value": "2017-06-01"
      },
      "http://www.w3.org/ns/dcat#endDate": {
        "@type": "http://www.w3.org/2001/XMLSchema#date",
        "@value": "2017-08-31"
      }
    },
    "http://www.w3.org/ns/dcat#contactPoint": {
      "@type": [
        "http://www.w3.org/2006/vcard/ns#Organization"
      ],
      "http://www.w3.org/2006/vcard/ns#fn": {
        "@language": "cs",
        "@value": "Jan Málek,starosta"
      },
      "http://www.w3.org/2006/vcard/ns#hasEmail": "ou.bylany@worldonline.cz"
    }
  };

  testRunner(srcIri, expected, done);

});


const ISS94 = {
  "@id": "_:ds",
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "aaabbb"
    }
  ],
  "http://purl.org/dc/terms/description": [
    {
      "@language": "cs",
      "@value": "bbb"
    }
  ],
  "http://www.w3.org/ns/dcat#keyword": [
    [
      {
        "@language": "cs",
        "@value": "cccs"
      },
      {
        "@language": "en",
        "@value": "en"
      }
    ]
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "http://purl.org/dc/terms/title": [
        {
          "@language": "cs",
          "@value": "Moje webservica"
        },
        {
          "@language": "en",
          "@value": "my webservice"
        }
      ],
      "http://www.w3.org/ns/dcat#accessURL": {
        "@id": "https://url.cz"
      },
      "http://www.w3.org/ns/dcat#accessService": {
        "@type": "http://www.w3.org/ns/dcat#DataService",
        "http://www.w3.org/ns/dcat#endpointURL": {
          "@id": "https://url.cz"
        },
        "http://www.w3.org/ns/dcat#endpointDescription": {
          "@id": "https://popis.url"
        },
        "http://purl.org/dc/terms/title": [
          {
            "@language": "cs",
            "@value": "Moje webservica"
          },
          {
            "@language": "en",
            "@value": "my webservice"
          }
        ],
        "http://www.w3.org/ns/dcat#servesDataset": {
          "@id": "_:ds"
        }
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
          "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
        }
      }
    }
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY"
  },
  "http://purl.org/dc/terms/spatial": [
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    },
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    },
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    }
  ],
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/ENER"
    }
  ],
  "http://purl.org/dc/terms/conformsTo": []
}

const ISS94_EXPECTED = {
  "@id": "_:ds",
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "aaabbb"
    }
  ],
  "http://purl.org/dc/terms/description": [
    {
      "@language": "cs",
      "@value": "bbb"
    }
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "http://purl.org/dc/terms/title": [
        {
          "@language": "cs",
          "@value": "Moje webservica"
        },
        {
          "@language": "en",
          "@value": "my webservice"
        }
      ],
      "http://www.w3.org/ns/dcat#accessURL": {
        "@id": "https://url.cz"
      },
      "http://www.w3.org/ns/dcat#accessService": {
        "@type": "http://www.w3.org/ns/dcat#DataService",
        "http://www.w3.org/ns/dcat#endpointURL": {
          "@id": "https://url.cz"
        },
        "http://www.w3.org/ns/dcat#endpointDescription": {
          "@id": "https://popis.url"
        },
        "http://purl.org/dc/terms/title": [
          {
            "@language": "cs",
            "@value": "Moje webservica"
          },
          {
            "@language": "en",
            "@value": "my webservice"
          }
        ],
        "http://www.w3.org/ns/dcat#servesDataset": {
          "@id": "_:ds"
        }
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
          "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
        }
      }
    }
  ],
  "http://www.w3.org/ns/dcat#keyword": [
    [
      {
        "@language": "cs",
        "@value": "cccs"
      },
      {
        "@language": "en",
        "@value": "en"
      }
    ]
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY"
  },
  "http://purl.org/dc/terms/spatial": [
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    }
  ],
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/ENER"
    }
  ]
};

test("ISS94", done => {
  REMOTE_SOURCE = {
    "https://data.eghuro.cz/dump/nkod-registrace.jsonld (5).txt": ISS94
  };
  const srcIri = "https://data.eghuro.cz/dump/nkod-registrace.jsonld (5).txt";

  testRunner(srcIri, ISS94_EXPECTED, done);
});

const ISS95 = {
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
  ],
  "http://purl.org/dc/terms/title": {
    "@language": "cs",
    "@value": "Aktuality"
  },
  "http://purl.org/dc/terms/description": {
    "@language": "cs",
    "@value": "V této sekci jsou definovány jednotlivé třídy a jejich vlastnosti potřebné pro popis aktualit. Pro každou vlastnost je uveden její identifikátor, který je pro její reprezentaci použit ve všech datových formátech, její název, datový typ, popis a příklad."
  },
  "http://www.w3.org/ns/dcat#keyword": [
    {
      "@language": "cs",
      "@value": "Aktuality"
    },
    {
      "@language": "cs",
      "@value": "Novinky"
    },
    {
      "@language": "cs",
      "@value": "Informace"
    }
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {
      "@type": [
        "http://www.w3.org/ns/dcat#Distribution"
      ],
      "http://www.w3.org/ns/dcat#downloadURL": {
        "@id": "http://nesmysl.cz"
      },
      "http://www.w3.org/ns/dcat#mediaType": {
        "@id": "http://www.iana.org/assignments/media-types/application/json"
      },
      "http://purl.org/dc/terms/format": {
        "@id": "http://publications.europa.eu/resource/authority/file-type/JSON"
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
          "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
        }
      }
    }
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY"
  },
  "http://purl.org/dc/terms/spatial": {
    "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
  },
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/SOCI"
    }
  ]
}

const ISS95_EXPECTED = {
  "@id": "_:ds",
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "Aktuality"
    }
  ],
  "http://purl.org/dc/terms/description": [
    {
      "@language": "cs",
      "@value": "V této sekci jsou definovány jednotlivé třídy a jejich vlastnosti potřebné pro popis aktualit. Pro každou vlastnost je uveden její identifikátor, který je pro její reprezentaci použit ve všech datových formátech, její název, datový typ, popis a příklad."
    }
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {
      "@type": "http://www.w3.org/ns/dcat#Distribution",
      "http://www.w3.org/ns/dcat#downloadURL": {
        "@id": "http://nesmysl.cz"
      },
      "http://www.w3.org/ns/dcat#mediaType": {
        "@id": "http://www.iana.org/assignments/media-types/application/json"
      },
      "http://purl.org/dc/terms/format": {
        "@id": "http://publications.europa.eu/resource/authority/file-type/JSON"
      },
      "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
        "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
        "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
          "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
          "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
        },
        "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
          "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
        }
      }
    }
  ],
  "http://www.w3.org/ns/dcat#keyword": [
    [
      {
        "@language": "cs",
        "@value": "Aktuality"
      }
    ],
    [
      {
        "@language": "cs",
        "@value": "Novinky"
      }
    ],
    [
      {
        "@language": "cs",
        "@value": "Informace"
      }
    ]
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY"
  },
  "http://purl.org/dc/terms/spatial": [
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    }
  ],
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/SOCI"
    }
  ]
}

test("ISS95", done=> {
  REMOTE_SOURCE = {
    "https://data.eghuro.cz/dump/nkod-registrace.jsonld_aktuality.txt": ISS95
  }

  const srcIri = "https://data.eghuro.cz/dump/nkod-registrace.jsonld_aktuality.txt";
  testRunner(srcIri, ISS95_EXPECTED, done);
});

const ISS97a = {
  "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/MDopravy/154129471",
  "@type" : [ "https://data.gov.cz/slovn\u00EDk/nkod/typ-datov\u00E9-sady-dle-zdroje/Formul\u00E1\u0159" , "http://www.w3.org/ns/dcat#Dataset" ],
  "http://purl.org/dc/terms/modified" : [ { "@value" : "2017-01-24T00:00:00" , "@type" : "http://www.w3.org/2001/XMLSchema#dateTime" } ] ,
  "http://purl.org/dc/terms/title" : [ { "@value" : "Faktury CENDIS 2016" , "@language" : "cs" } ] ,
  "http://purl.org/dc/terms/description" : [ { "@value" : "Uhrazen\u00E9 faktury CENDIS (resort dopravy) v roce 2016" , "@language" : "cs" } ] ,
  "http://purl.org/dc/terms/identifier" : [ { "@value" : "https://data.gov.cz/zdroj/datov\u00E9-sady/n75aau3/154129471" , "@type" : "http://www.w3.org/2001/XMLSchema#anyURI" } ,
    "154129471" ] ,
  "http://purl.org/dc/terms/publisher" : [ { "@id" : "https://data.gov.cz/zdroj/ovm/66003008" } ] ,
  "http://purl.org/dc/terms/issued" : [ { "@value" : "2017-01-24T00:00:00" , "@type" : "http://www.w3.org/2001/XMLSchema#dateTime" } ] ,
  "http://purl.org/dc/terms/spatial" : [ { "@id" : "https://linked.cuzk.cz/resource/ruian/stat/1" } ] ,
  "http://purl.org/dc/terms/accrualPeriodicity" : [ { "@id" : "http://publications.europa.eu/resource/authority/frequency/MONTHLY" } ] ,
  "http://www.w3.org/ns/dcat#distribution" : [ { "@id" : "https://data.gov.cz/zdroj/datov\u00E9-sady/MDopravy/154129471/distribuce/6d24ab88c1e4a0432a2a6e1cd383c0c7" } ] ,
  "http://www.w3.org/ns/dcat#keyword" : "faktura"
};

const ISS97a_EXPECTED = {
  "@id": "https://data.gov.cz/zdroj/datov\u00E9-sady/MDopravy/154129471",
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "Faktury CENDIS 2016"
    }
  ],
  "http://purl.org/dc/terms/description": [
    {
      "@language": "cs",
      "@value": "Uhrazené faktury CENDIS (resort dopravy) v roce 2016"
    }
  ],
  "http://www.w3.org/ns/dcat#keyword": [
    [
      {
        "@language": "cs",
        "@value": "faktura"
      }
    ]
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY"
  },
  "http://purl.org/dc/terms/spatial": [
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    }
  ],
  "http://www.w3.org/ns/dcat#theme": []
};

test("ISS97a", done=> {
  REMOTE_SOURCE = {
    "https://data.gov.cz/zdroj/datové-sady/MDopravy/154129471": ISS97a
  }

  const srcIri = "https://data.gov.cz/zdroj/datové-sady/MDopravy/154129471";
  testRunner(srcIri, ISS97a_EXPECTED, done);
});

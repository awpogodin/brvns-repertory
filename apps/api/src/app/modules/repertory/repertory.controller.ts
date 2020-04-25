import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from "@nestjs/common";
import { RepertoryService } from "./repertory.service";
import { CategoryDTO } from "../../../../../../common/dto/category.dto";
import { CategoryBodyDTO } from "../../../../../../common/dto/category-body.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { MedicationDTO } from "../../../../../../common/dto/medication.dto";
import { MedicationBodyDTO } from "../../../../../../common/dto/medication-body.dto";
import { SymptomDTO } from "../../../../../../common/dto/symptom.dto";
import { SymptomBodyDTO } from "../../../../../../common/dto/symptom-body.dto";
import { SymptomToMedicationBodyDTO } from "../../../../../../common/dto/symptom-to-medication-body.dto";

function intersection(lists): any[] {
    const result = [];

    for (let i = 0; i < lists.length; i++) {
        const currentList = lists[i];
        for (let y = 0; y < currentList.length; y++) {
            const currentValue = currentList[y];
            if (!result.includes(currentValue)) {
                if (
                    lists.filter(function (obj) {
                        return obj.indexOf(currentValue) === -1;
                    }).length === 0
                ) {
                    result.push(currentValue);
                }
            }
        }
    }
    return result;
}

function getListOfMedicationsToBulkCreate(): MedicationBodyDTO[] {
    return [
        {
            name: "anac",
            description: "Анакардиум ориентале (Anacardium orientale)",
        },
        {
            name: "abr",
            description: "Абрус прекаториус (Abrus precatorius)",
        },
        {
            name: "muc-p",
            description: "Мукоза пульмонис суис (Mucosa pulmonis suis)",
        },
        {
            name: "myos",
            description: "Миозотис симфитифолиа (Myosotis symphytifolia)",
        },
        {
            name: "kali-t",
            description: "Калий тартарикум (Kali tartaricum)",
        },
        {
            name: "carbn",
            description: "Карбонеум (Carboneum)",
        },
        {
            name: "ambro",
            description: "Амброзия артемизефолия (Ambrosia artemisiefolia)",
        },
        {
            name: "paraf",
            description: "Параффинум (Paraffinum)",
        },
        {
            name: "nat-cac",
            description: "Натриум какодиликум (Natrum cacodylicum)",
        },
        {
            name: "semp",
            description: "Семпервивум текторум (Sempervivum tectorum)",
        },
        {
            name: "morbill",
            description: "Морбиллинум (Morbillinum)",
        },
        {
            name: "orni",
            description: "Орнитогалум умбеллатум (Ornithogalum umbellatum)",
        },
        {
            name: "nectrin",
            description: "Нектрианинум (Nectrianinum)",
        },
        {
            name: "lob-e",
            description: "Лобелия эринус (Lobelia erinus)",
        },
        {
            name: "euph-he",
            description: "Эуфорбия гетеродокса (Euphorbia heterodoxa)",
        },
        {
            name: "cory",
            description: "Кормдалис формоза (Corydalis formosa)",
        },
        {
            name: "scirr",
            description: "Скирринум (Scirrhinum)",
        },
        {
            name: "ov",
            description: "Овининум (Ovininum)",
        },
        {
            name: "nicc-s",
            description: "Никколюм сульфурикум (Niccolum sulphuricum)",
        },
        {
            name: "scam",
            description: "Скаммоний (Scammonium)",
        },
        {
            name: "aln",
            description: "Альнус рубра (Alnus rubra)",
        },
        {
            name: "esp",
            description: "Эсплеция Грандифлора (Espeletia grandiflora)",
        },
        {
            name: "mom-b",
            description: "Момордика балсамика (Momordica balsamica)",
        },
        {
            name: "chol",
            description: "Холестеринум (Cholesterinum)",
        },
        {
            name: "thiosin",
            description: "Тиосинаминум (Thiosinaminum)",
        },
        {
            name: "vanad",
            description: "Ванадиум металликум (Vanadium metallicum)",
        },
        {
            name: "vacc-m",
            description: "Вакциниум миртиллус (Vaccinium myrtillus)",
        },
        {
            name: "vac",
            description: "Вакцинум (Vaccininum)",
        },
        {
            name: "narc-ps",
            description:
                "Нарциссус псеудонарциссус (Narcissus pseudonarcissus)",
        },
        {
            name: "ort-a",
            description: "Ортосифон аристатус (Orthosiphon aristatus)",
        },
        {
            name: "magn-gl",
            description: "Магнолия глаука (Magnolia glauca)",
        },
        {
            name: "erod",
            description: "Эродиум цикутариум (Erodium cicutarium)",
        },
        {
            name: "nat-sil-f",
            description: "Натриум силикофлюорикум (Natrum silicofluoricum)",
        },
        {
            name: "sym-r",
            description: "Симфорикарпус рацемосус (Symphoricarpus racemosus)",
        },
        {
            name: "trif-r",
            description: "Трифолиум репенс (Trifolium repens)",
        },
        {
            name: "mangi",
            description: "Мангифера индика (Mangifera indica)",
        },
        {
            name: "atph-d",
            description:
                "Аденозин трифосфат динатриум (Adenosin triphosphat dinatrium)",
        },
        {
            name: "rhus-a",
            description: "Рус ароматика (Rhus aromatica)",
        },
        {
            name: "leon",
            description: "Леонурус кардиака (Leonurus cardiaca)",
        },
        {
            name: "ger",
            description: "Гераниум макулатум (Geranium maculatum)",
        },
        {
            name: "lath",
            description: "Латирус сативус (Lathyrus sativus)",
        },
        {
            name: "canch",
            description: "Канкалагуа (Canchalagua)",
        },
        {
            name: "botul",
            description: "Ботулинум (Botulinum)",
        },
        {
            name: "lem-m",
            description: "Лемна минор (Lemna minor)",
        },
        {
            name: "ur-ac",
            description: "Урикум ацидум (Uricum acidum)",
        },
        {
            name: "oxyd",
            description: "Оксидендрон арбореум (Oxydendron arboreum)",
        },
        {
            name: "liatr",
            description: "Лиатрис спиката (Liatris spicata)",
        },
        {
            name: "juni-c",
            description: "Юниперус коммунис (Juniperus communis)",
        },
        {
            name: "blatta-a",
            description: "Блатта американа (Blatta americana)",
        },
        {
            name: "lapa",
            description: "Лапатум акутум (Lapathum acutum)",
        },
        {
            name: "ampe-qu",
            description: "Виноград девичий (Ampelopsis quinquefolia)",
        },
        {
            name: "malar",
            description: "Нозод малярии (Malaria nosode)",
        },
        {
            name: "vesi",
            description: "Везикария коммунис (Vesicaria communis)",
        },
        {
            name: "stront-br",
            description: "Стронтиум броматум (Strontium bromatum)",
        },
        {
            name: "skook",
            description: "Скоокум чук аква (Skookum chuck aqua)",
        },
        {
            name: "lac-v",
            description: "Лак вакцинум (Lac vaccinum)",
        },
        {
            name: "conv",
            description: "Конваллария маялис (Convallaria majalis)",
        },
        {
            name: "muc-pyl",
            description: "Мукоза пилори суис (Mucosa pylori suis)",
        },
        {
            name: "muc-ur",
            description:
                "Мукоза везице уринариэ суис (Mucosa vesicae urinarie suis)",
        },
        {
            name: "pulx",
            description: "Пулекс ирританс (Pulex irritans)",
        },
        {
            name: "trib",
            description: "Трибулус террестрис (Tribulus terrestris)",
        },
        {
            name: "urea",
            description: "Уреа пура (Urea pura)",
        },
        {
            name: "staphyl",
            description: "Стафилококкус нозоде (Staphylococcus nosode)",
        },
        {
            name: "zinc-i",
            description: "Цинкум йодатум (Zincum iodatum)",
        },
        {
            name: "lith-be",
            description: "Литиум бензоикум (Lithium benzoicum)",
        },
        {
            name: "trop",
            description: "Тропеолум майус (Tropaeolum majus)",
        },
        {
            name: "lith-l",
            description: "Литиум лактикум (Lithium lacticum)",
        },
        {
            name: "tub-a",
            description: "Туберкулинум авис (Tuberculinum avis)",
        },
        {
            name: "ars-br",
            description: "Арсеникум броматум (Arsenicum bromatum)",
        },
        {
            name: "aethi-a",
            description: "Этиопс антимониалис (Aethiops antimonialis)",
        },
        {
            name: "pipe",
            description: "Пиперазинум (Piperazinum)",
        },
        {
            name: "sul-ter",
            description: "Сульфур теребинтинатум (Sulphur terebinthinatum)",
        },
        {
            name: "arbu",
            description: "Арбутус андрахне (Arbutus andrachne)",
        },
        {
            name: "Tea",
            description: "Масло чайного дерева (Tea tree oil)",
        },
        {
            name: "mang-p",
            description: "Манганум фосфорикум (Manganum phosphoricum)",
        },
        {
            name: "am-p",
            description: "Аммониум фосфорикум (Ammonium phosphoricum)",
        },
        {
            name: "lappa",
            description: "Лаппа арктиум (Lappa arctium)",
        },
        {
            name: "thiam",
            description: "Тиаминум гидрохлорикум (Thiaminum hydrochloricum)",
        },
        {
            name: "frag",
            description: "Фрагария веска (Fragaria vesca)",
        },
        {
            name: "convo-a",
            description: "Конвольвулюс арвензис (Convolvulus arvensis)",
        },
        {
            name: "bor-ac",
            description: "Борикум ацидум (Boricum acidum)",
        },
        {
            name: "kali-sula",
            description: "Калий сульфуратум (Kali sulphuratum)",
        },
        {
            name: "oreo",
            description: "Ореодафне калифорника (Oreodaphne californica)",
        },
        {
            name: "prim-o",
            description: "Примула обконика (Primula obconica)",
        },
        {
            name: "usn",
            description: "Уснеа барбата (Usnea barbata)",
        },
        {
            name: "lepr",
            description: "Лепроминиум (Leprominium)",
        },
        {
            name: "vib-p",
            description: "Вибурнум прунифолиум (Viburnum prunifolium)",
        },
        {
            name: "tus-fa",
            description: "Туссилаго фарфара (Tussilago farfara)",
        },
        {
            name: "coxs",
            description: "Коксаки вирус А нозод (Coxsackie virus a nosode)",
        },
        {
            name: "verbe-u",
            description: "Вербена уртицифолиа (Verbena urticifolia)",
        },
        {
            name: "duod-su",
            description: "Дуоденум суис (Duodenum suis)",
        },
        {
            name: "glan",
            description:
                "Гландула супрареналис суис (Glandula suprarenalis suis)",
        },
        {
            name: "scol",
            description: "Сколопендра морситанс (Scolopendra morsitans)",
        },
        {
            name: "sapo",
            description: "Сапонария оффициналис (Saponaria officinalis)",
        },
        {
            name: "zinc-ar",
            description: "Цинкум арсеникзум (Zincum arsenicosum)",
        },
        {
            name: "aeth-n",
            description: "Этилум нитрикум (Aethylum nitricum)",
        },
        {
            name: "rhus-d",
            description: "Рус диверсилоба (Rhus diversiloba)",
        },
        {
            name: "chen-v",
            description: "Хеноподиум вулвария (Chenopodium vulvaria)",
        },
        {
            name: "itu",
            description: "Иту (Itu)",
        },
        {
            name: "B12",
            description: "Цианкобаламинум (Cyanocobalaminum)",
        },
        {
            name: "pix",
            description: "Пикс ликвида (Pix liquida)",
        },
        {
            name: "nat-l",
            description: "Натриум лактикум (Natrum lacticum)",
        },
        {
            name: "menthol",
            description: "Ментолум (Mentholum)",
        },
        {
            name: "var",
            description: "Вариолинум (Variolinum)",
        },
        {
            name: "onon",
            description: "Ононис спиноза (Ononis spinosa)",
        },
        {
            name: "kou",
            description: "Коуссо (Kousso)",
        },
        {
            name: "anthr",
            description: "Антрацинум (Anthracinum)",
        },
        {
            name: "cortiso",
            description: "Кортизонум (Kortisonum)",
        },
        {
            name: "seq-s",
            description: "Секвойа семпервиренс (Sequoia sempervirens)",
        },
        {
            name: "sed-ac",
            description: "Седум акре (Sedum acre)",
        },
        {
            name: "but-ac",
            description: "Бутирикум ацидум (Butyricum acidum)",
        },
        {
            name: "anthro",
            description: "Антрококали (Anthrokokali)",
        },
        {
            name: "agra",
            description: "Аграфис нутанс (Agraphis nutans)",
        },
        {
            name: "yohim",
            description: "Иохимбинум (Yohimbinum)",
        },
        {
            name: "nit-m-ac",
            description: "Нитромуриатикум ацидум (Nitromuriaticum acidum)",
        },
        {
            name: "ven",
            description: "Вена суис (Vena suis)",
        },
        {
            name: "nicot",
            description: "Никотинум (Nicotinum)",
        },
        {
            name: "joan",
            description: "Иоанесиа асока (Joanesia asoca)",
        },
        {
            name: "marb",
            description: "Марбэл (Marble)",
        },
        {
            name: "mang-s",
            description: "Манганум сульфурикум (Manganum sulphuricum)",
        },
        {
            name: "phenac",
            description: "Фенацетинум (Phenacetinum)",
        },
        {
            name: "cart",
            description: "Картиляго суис (Cartilago suis)",
        },
        {
            name: "salv",
            description: "Сальвия оффициналис (Salvia officinalis)",
        },
        {
            name: "calc-chln",
            description: "Калькарея хлорината (Calcarea chlorinata)",
        },
        {
            name: "lith-m",
            description: "Литиум муриатикум (Lithium muriaticum)",
        },
        {
            name: "hell-o",
            description: "Геллеборус ориенталис (Helleborus orientalis)",
        },
        {
            name: "euph-pi",
            description: "Эуфорбия пилюлифера (Euphorbia pilulifera)",
        },
        {
            name: "plb-n",
            description: "Плюмбум нитрикум (Plumbum nitricum)",
        },
        {
            name: "nat-d",
            description:
                "Натриум диэтилоксалацетикум (Natrium diethyloxalaceticum)",
        },
        {
            name: "prun-v",
            description: "Прунус виргиниана (Prunus virginiana)",
        },
        {
            name: "prop",
            description: "Пропиламинум (Propylaminum)",
        },
        {
            name: "esin",
            description: "Эсеринум (Eserinum)",
        },
        {
            name: "prun-p",
            description: "Прунус падус э кортице (Prunus padus e cortice)",
        },
        {
            name: "bac-s",
            description: "Бациллюс сикоккус (Bacillus sycoccus)",
        },
        {
            name: "atr-r",
            description: "Атракс робустус (Atrax robustus)",
        },
        {
            name: "euph-cy",
            description: "Эуфорбия кипариссиас (Euphorbia cyparissias)",
        },
        {
            name: "Iris",
            description: "Ирис версиколор (Iris versicolor)",
        },
        {
            name: "zinc-br",
            description: "Цинкум броматум (Zincum bromatum)",
        },
        {
            name: "colibac",
            description: "Колибактеринум (Colibacilinum)",
        },
        {
            name: "astra-mo",
            description: "Астрагалус моллисимус (Astragalus mollisimus)",
        },
        {
            name: "franc",
            description: "Францискэа унифлора (Franciscaea uniflora)",
        },
        {
            name: "phal",
            description: "Фаллюс импудикус (Phallus impudicus)",
        },
        {
            name: "cary",
            description: "Кария альба (Carya alba)",
        },
        {
            name: "orch",
            description: "Орчитинум (Orchitinum)",
        },
        {
            name: "pop",
            description: "Популюс тремулоидес (Populus tremuloides)",
        },
        {
            name: "Imp",
            description: "Императория острутиум (Imperatoria ostruthium)",
        },
        {
            name: "Iris-g",
            description: "Ирис германика (Iris germanica)",
        },
        {
            name: "gent-q",
            description: "Генциана квинквефлора (Gentiana quinqueflora)",
        },
        {
            name: "ulm",
            description: "Ульмус фульва (Ulmus fulva)",
        },
        {
            name: "euph-ip",
            description: "Эуфорбия ипекакуана (Euphorbia ipecacuanha)",
        },
        {
            name: "chelo",
            description: "Хелоне глабра (Chelone glabra)",
        },
        {
            name: "brucin",
            description: "Бруцинум нитрикум (Brucinum nitricum)",
        },
        {
            name: "kino",
            description: "Кино птерокарпи (Kino pterocarpi)",
        },
        {
            name: "kara",
            description: "Карака (Karaka)",
        },
        {
            name: "alst-s",
            description: "Алстония схоларис (Alstonia scholaris)",
        },
        {
            name: "aethi-m",
            description: "Этиопс минералис (Aethiops mineralis)",
        },
        {
            name: "ol-sant",
            description: "Олеум сантали (Oleum santali)",
        },
        {
            name: "jatr-c",
            description: "Ятрофа куркас (Jatropha curcas)",
        },
        {
            name: "eryth",
            description: "Эритринус (Erythrinus)",
        },
        {
            name: "arg-i",
            description: "Аргентум йодатум (Argentum iodatum)",
        },
        {
            name: "stach",
            description: "Стачис бетоника (Stachys betonica)",
        },
        {
            name: "influ",
            description: "Инфлюэнцинум (Influenzinum)",
        },
        {
            name: "strept",
            description: "Стрептококцинум (Streptococcinum)",
        },
        {
            name: "cuph",
            description: "Куфеа вискосиссима (Cuphea viscosissima)",
        },
        {
            name: "kali-cit",
            description: "Калий цитрикум (Kali citricum)",
        },
        {
            name: "kali-chls",
            description: "Калий хлорозум (Kali chlorosum)",
        },
        {
            name: "mang-o",
            description:
                "Манганум оксидатум нативум (Manganum oxydatum nativum)",
        },
        {
            name: "sanguin-n",
            description: "Сангуинаринум нитрикум (Sanguinarinum nitricum)",
        },
        {
            name: "euph-pe",
            description: "Эуфорбия пеплюс (Euphorbia peplus)",
        },
        {
            name: "Rub-t",
            description: "Рубия тинкториум (Rubia tinctorum)",
        },
        {
            name: "senec-j",
            description: "Сенецио якобоэа (Senecio jacoboea)",
        },
        {
            name: "rham-f",
            description: "Рамнус франгула (Rhamnus frangula)",
        },
        {
            name: "picro",
            description: "Пикротоксинум (Picrotoxinum)",
        },
        {
            name: "kali-fcy",
            description: "Калий ферроцианатум (Kali ferrocyanatum)",
        },
        {
            name: "cund",
            description: "Кундуранго (Cundurango)",
        },
        {
            name: "arum-d",
            description: "Арум драконтиум (Arum dracontium)",
        },
        {
            name: "acal",
            description: "Акалифа индика (Acalypha indica)",
        },
        {
            name: "ros-d",
            description: "Роза дамасцена (Rosa damascena)",
        },
        {
            name: "stann-i",
            description: "Станнум йодатум (Stannum iodatum)",
        },
        {
            name: "euon-a",
            description: "Эуонимус атропурпуреа (Euonymus atropurpurea)",
        },
        {
            name: "methyl",
            description: "Метмленум коерулеум (Methylenum coeruleum)",
        },
        {
            name: "adlu",
            description: "Адлумия фунгоза (Adlumia fungosa)",
        },
        {
            name: "narcot",
            description: "Наркотинум пура (Narcotinum pura)",
        },
        {
            name: "just",
            description: "Юстиция адатода (Justicia adhatoda)",
        },
        {
            name: "crat",
            description: "Кратэгус оксиканта (Crataegus oxyacantha)",
        },
        {
            name: "benz",
            description: "Бензолум (Benzolum)",
        },
        {
            name: "kali-acet",
            description: "Калий ацетикум (Kali aceticum)",
        },
        {
            name: "sol-o",
            description: "Соланум олерацеум (Solanum oleraceum)",
        },
        {
            name: "uret",
            description: "Уретер суис (Ureter suis)",
        },
        {
            name: "still",
            description: "Стиллингия силватика (Stillingia sylvatica)",
        },
        {
            name: "oci",
            description: "Оцинум канум (Ocinum canum)",
        },
        {
            name: "euph-hy",
            description: "Эуфорбия гиперицифолиа (Euphorbia hypericifolia)",
        },
        {
            name: "dict",
            description: "Диктамнус альбус (Dictamnus albus)",
        },
        {
            name: "stry",
            description: "Стрихнинум пурум (Strychninum purum)",
        },
        {
            name: "junc",
            description: "Юнкус эффусус (Juncus effusus)",
        },
        {
            name: "euph-c",
            description: "Эуфорбия короллата (Euphorbia corollata)",
        },
        {
            name: "arg-m",
            description: "Аргентум металликум (Argentum metallicum)",
        },
        {
            name: "tela",
            description: "Тела аранеэ (Tela araneae)",
        },
        {
            name: "mim-h",
            description: "Мимоза гумилис (Mimosa humilis)",
        },
        {
            name: "muc-n",
            description: "Мукоза назалис суис (Mucosa nasalis suis)",
        },
        {
            name: "lon-p",
            description: "Лоницера периклименум (Lonicera periclymenum)",
        },
        {
            name: "hip-ac",
            description: "Гиппурикум ацидум (Hippuricum acidum)",
        },
        {
            name: "digin",
            description: "Дигиталинум (Digitalinum)",
        },
        {
            name: "chion",
            description: "Чионантус виргиника (Chionanthus virginica)",
        },
        {
            name: "merc-acet",
            description: "Меркуриус ацетикус (Mercurius aceticus)",
        },
        {
            name: "ferr-br",
            description: "Феррум броматум (Ferrum bromatum)",
        },
        {
            name: "magn-gr",
            description: "Магнолия грандифлора (Magnolia grandiflora)",
        },
        {
            name: "vichy-g",
            description: "Вичи аква Гранде Грилле (Vichy aqua grande grille)",
        },
        {
            name: "trif-p",
            description: "Трифолиум пратенсе (Trifolium pratense)",
        },
        {
            name: "salx-p",
            description: "Саликс пурпуреа (Salix purpurea)",
        },
        {
            name: "urin",
            description: "Уринум (Urinum)",
        },
        {
            name: "calc-hp",
            description: "Калькарея гипофосфороза (Calcarea hypophosphorosa)",
        },
        {
            name: "pyel",
            description: "Пиэлон суис (Pyelon suis)",
        },
        {
            name: "pisc",
            description: "Писцидия эритрина (Piscidia erythrina)",
        },
        {
            name: "iris-t",
            description: "Ирис тенах (Iris tenax)",
        },
        {
            name: "paull",
            description: "Пауллиния сорбилис (Paullinia sorbilis)",
        },
        {
            name: "mag-f",
            description: "Магнезия флюората (Magnesia fluorata)",
        },
        {
            name: "blatta",
            description: "Блатта ориенталис (Blatta orientalis)",
        },
        {
            name: "granit",
            description: "Гранитум (Granitum)",
        },
        {
            name: "lap-a",
            description: "Ляпис альбус (Lapis albus)",
        },
        {
            name: "ran-fl",
            description: "Рамнус фламмула (Ranunculus flammula)",
        },
        {
            name: "zinc-cy",
            description: "Цинкум цианатум (Zincum cyanatum)",
        },
        {
            name: "succ-ac",
            description: "Сукцинум ацидум (Succinum acidum)",
        },
        {
            name: "polyg",
            description:
                "Полигонум гидропипероидес (Polygonum hydropiperoides)",
        },
        {
            name: "aquil",
            description: "Аквилегия вульгарис (Aquilegia vulgaris)",
        },
        {
            name: "coryd-b",
            description: "Коридалис бульбоза (Corydalis bulbosa)",
        },
        {
            name: "dicha",
            description: "Дикапеталум тунбергх (Dichapetalum thunbergh)",
        },
        {
            name: "silphu",
            description: "Силфиум лациниатум (Silphium laciniatum)",
        },
        {
            name: "vib-t",
            description: "Вибурнум тинус (Viburnum tinus)",
        },
        {
            name: "ergot",
            description: "Эрготинум (Ergotinum)",
        },
        {
            name: "nat-ar",
            description: "Натриум арсеникозум (Natrum arsenicosum)",
        },
        {
            name: "maland",
            description: "Маландринум (Malandrinum)",
        },
        {
            name: "x-ray",
            description: "Х-рейс (X-rays)",
        },
        {
            name: "lina",
            description: "Линария вульгарис (Linaria vulgaris)",
        },
        {
            name: "lim",
            description: "Лимулюс циклопс (Limulus cyclops)",
        },
        {
            name: "gad",
            description: "Гадус моррхуа (Gadus morrhua)",
        },
        {
            name: "fuchs",
            description: "Фушизум (Fuchsinum)",
        },
        {
            name: "franz",
            description: "Франзенсбад (Franzensbad)",
        },
        {
            name: "asc-c",
            description: "Асклепиас корнути (Asclepias cornuti)",
        },
        {
            name: "gali",
            description: "Галиум апарине (Galium aparine)",
        },
        {
            name: "pen",
            description: "Пенторум седоидес (Penthorum sedoides)",
        },
        {
            name: "guat",
            description: "Гваттерия гаумери (Guatteria gaumeri)",
        },
        {
            name: "myrt-c",
            description: "Миртус коммунис (Myrtus communis)",
        },
        {
            name: "aral",
            description: "Аралия рацемоза (Aralia racemosa)",
        },
        {
            name: "cuc-pep",
            description: "Кукурбита перо (Cucurbita pepo)",
        },
        {
            name: "epig",
            description: "Эпигеа репенс (Epigea repens)",
        },
        {
            name: "echi",
            description: "Эхинацея ангустифолиа (Echinacea angustifolia)",
        },
        {
            name: "amph",
            description: "Амфисбэна вермикуларис (Amphisbaena vermicularis)",
        },
        {
            name: "asim",
            description: "Асимина трилоба (Asimina triloba)",
        },
        {
            name: "ap-g",
            description: "Апиум гравеоленс (Apium graveolens)",
        },
        {
            name: "sin-a",
            description: "Синапис альба (Sinapis alba)",
        },
        {
            name: "pop-c",
            description: "Популюс кандиканс (Populus candicans)",
        },
        {
            name: "tart-ac",
            description: "Тартарикум ацидум (Tartaricum acidum)",
        },
        {
            name: "benz-d",
            description: "Бензолум динитрикум (Benzolum dinitricum)",
        },
        {
            name: "vanil",
            description: "Ванилиа ароматика (Vanilia aromatica)",
        },
        {
            name: "pyr-h",
            description:
                "Пиридоксинум гидрохлорикум (Pyridoxinum hydrochloricum)",
        },
        {
            name: "ric",
            description: "Рицинус коммунис (Ricinus communis)",
        },
        {
            name: "csop",
            description: "Скопариус (Scoparius)",
        },
        {
            name: "mag-p",
            description: "Магнезия фосфорика (Magnesia phosphorica)",
        },
        {
            name: "calc-l",
            description: "Калькарея Лактика (Calcarea lactica)",
        },
        {
            name: "beryl",
            description: "Бериллиум металликум (Beryllium metallicum)",
        },
        {
            name: "sil-mar",
            description: "Силика марина (Silica marina)",
        },
        {
            name: "trinit",
            description: "Тринитротолуол (Trinitrotoluene)",
        },
        {
            name: "matth",
            description: "Маттиола грэка (Matthiola graeca)",
        },
        {
            name: "gunp",
            description: "ганпаудер (Gunpowder)",
        },
        {
            name: "conch",
            description: "КОНХИОЛИНУМ (Conchiolinum)",
        },
        {
            name: "rad-br",
            description: "Радиум броматум (Radium bromatum)",
        },
        {
            name: "dol",
            description: "Долихос пруриенс (Dolichos pruriens)",
        },
        {
            name: "berb-a",
            description: "Берберис аквафолиум (Berberis aquafolium)",
        },
        {
            name: "hecla",
            description: "Гекла лава (Hecla lava)",
        },
        {
            name: "stel",
            description: "Стеллария средняя (Stellaria media)",
        },
        {
            name: "alst-c",
            description: "Алстония констрикта (Alstonia constricta)",
        },
        {
            name: "prim-vul",
            description: "Примула вульгарис (Primula vulgaris)",
        },
        {
            name: "chr-o",
            description: "Хромуим оксидатум (Chromuim oxidatum)",
        },
        {
            name: "chr-s",
            description: "Хромиум сульфурикум (Chromium sulphuricum)",
        },
        {
            name: "hedeo",
            description: "Гедеома пулегиоидес (Hedeoma pulegioides)",
        },
        {
            name: "am-be",
            description: "Аммониум бензоикум (Ammonium benzoicum)",
        },
        {
            name: "per",
            description: "Пертуссинум (Pertussinum)",
        },
        {
            name: "mang-m",
            description: "Манганум муриатикум (Manganum muriaticum)",
        },
        {
            name: "calc-ox",
            description: "Калькарея оксалика (Calcarea oxalica)",
        },
        {
            name: "calc-o-t",
            description: "Калькарея ови тестэ (Calcarea ovi testae)",
        },
        {
            name: "ephe",
            description: "Эфедра вульгарис (Ephedra vulgaris)",
        },
        {
            name: "thlaspi",
            description: "Тласпи бурса пасторис (Thlaspi bursa pastoris)",
        },
        {
            name: "crot-chlol",
            description: "Кротон хлоралум (Croton chloralum)",
        },
        {
            name: "parab",
            description: "Парабензохинонум (Parabenzochinonum)",
        },
        {
            name: "solid",
            description: "Солидаго вирга ауреа (Solidago virga aurea)",
        },
        {
            name: "plb-i",
            description: "Плюмбум йодатум (Plumbum iodatum)",
        },
        {
            name: "am-i",
            description: "Аммониум йодатум (Ammonium iodatum)",
        },
        {
            name: "adren",
            description: "Адреналинум (Adrenalinum)",
        },
        {
            name: "prim-v",
            description: "Примула верус (Primula verus)",
        },
        {
            name: "ran-g",
            description: "Ранункулюс глациалис (Ranunculus glacialis)",
        },
        {
            name: "lith-br",
            description: "Литиум броматум (Lithium bromatum)",
        },
        {
            name: "pareir",
            description: "Пареира брава (Pareira brava)",
        },
        {
            name: "petros",
            description: "Петроселинум сативум (Petroselinum sativum)",
        },
        {
            name: "dat-a",
            description: "Датура арбореа (Datura arborea)",
        },
        {
            name: "burs",
            description: "Пастушья сумка (Bursa pastoris)",
        },
        {
            name: "tet",
            description: "Тетрадимитум (Tetradimitum)",
        },
        {
            name: "eos",
            description: "Эозинум (Eosinum)",
        },
        {
            name: "antipyrin",
            description: "Антипиринум (Antipyrinum)",
        },
        {
            name: "symph",
            description: "Симфитум оффицинале (Symphytum officinale)",
        },
        {
            name: "epip",
            description: "Эпифегус виргиниана (Epiphegus virginiana)",
        },
        {
            name: "torula",
            description: "Торула церевизиае (Torula cerevisiae)",
        },
        {
            name: "phos-h",
            description: "Фосфорус гидрогенатус (Phosphorus hydrogenatus)",
        },
        {
            name: "uva",
            description: "Ува-урси (Uva-ursi)",
        },
        {
            name: "plat-m",
            description: "Платинум муриатикум (Platinum muriaticum)",
        },
        {
            name: "ac-f",
            description: "Ацидум фумарикум (Acidum fumaricum)",
        },
        {
            name: "ac-m",
            description: "Ацидум маликум (Acidum malicum)",
        },
        {
            name: "rosm",
            description: "Розмарин лекарственный (Rosmarinus officinalis)",
        },
        {
            name: "pitu-a",
            description:
                "Питуитария гландула антериор (Pituitaria glandula anterior)",
        },
        {
            name: "merc-s-cy",
            description: "Меркуриус сульфоцианатус (Mercurius sulphocyanatus)",
        },
        {
            name: "medus",
            description: "Медуза (Medusa)",
        },
        {
            name: "hell-f",
            description: "Геллеборус фоетидус (Helleborus foetidus)",
        },
        {
            name: "ferr-s",
            description: "Феррум сульфурикум (Ferrum sulphuricum)",
        },
        {
            name: "benzin",
            description: "Бензинум (Benzinum)",
        },
        {
            name: "nat-ox",
            description: "Натриум оксидатум (Natrum oxydatum)",
        },
        {
            name: "oxyg",
            description: "Оксигенум (Oxygenum)",
        },
        {
            name: "plect",
            description: "Плектрантус (Plectranthus fruticosus)",
        },
        {
            name: "hydr-ch",
            description: "Гидрохинонум (Hydrochinonum)",
        },
        {
            name: "Coen-Q",
            description: "Убихинонум (Ubichinonum)",
        },
        {
            name: "apoc-a",
            description: "Апоцинум андросемифолиум (Apocynum androsemifolium)",
        },
        {
            name: "pimp",
            description: "Пимпинелла сахифрага (Pimpinella saxifraga)",
        },
        {
            name: "Merc-ns",
            description: "Меркуриус нитрозус (Mercurius nitrosus)",
        },
        {
            name: "rumx",
            description: "Румекс криспус (Rumex crispus)",
        },
        {
            name: "ran-r",
            description: "Ранункулюс репенс (Ranunculus repens)",
        },
        {
            name: "aphis",
            description: "Афис хеноподии глауци (Aphis chenopodii glauci)",
        },
        {
            name: "pariet",
            description: "Париетария оффициналис (Parietaria officinalis)",
        },
        {
            name: "rhodi-o-n",
            description:
                "Родиум оксидатум нитрикум (Rhodium oxydatum nitricum)",
        },
        {
            name: "aur-br",
            description: "Аурум броматум (Aurum bromatum)",
        },
        {
            name: "fic-rel",
            description: "Фикус религиоза (Ficus religiosa)",
        },
        {
            name: "ammc",
            description: "Аммониакум гумми (Ammoniacum gummi)",
        },
        {
            name: "teucr-s",
            description: "Теукриум скородониа (Teucrium scorodonia)",
        },
        {
            name: "arist-m",
            description: "Аристолохия милхоменс (Aristolochia milhomens)",
        },
        {
            name: "phase",
            description: "Фазеолус нанус (Phaseolus nanus)",
        },
        {
            name: "kali-tel",
            description: "Калий теллурикум (Kali telluricum)",
        },
        {
            name: "ferr-t",
            description: "Феррум Тартарикум (Ferrum tartaricum)",
        },
        {
            name: "cupr-acet",
            description: "Купрум ацетикум (Cuprum aceticum)",
        },
        {
            name: "hedy",
            description: "Гедизарум илдефонсианум (Hedysarum ildefonsianum)",
        },
        {
            name: "oxyt",
            description: "Окситропис ламберти (Oxythropis lamberti)",
        },
        {
            name: "Tonsilla suis",
            description: "Тонзилла суис (Tonsilla suis)",
        },
        {
            name: "vip-r",
            description: "Випера редди (Vipera reddi)",
        },
        {
            name: "Bar-p",
            description: "Бариум фосфорикум (Baryta phosphorica)",
        },
        {
            name: "Ferr-ac",
            description: "Железа ацетат (Ferrum aceticum)",
        },
        {
            name: "cola",
            description: "Кола нут (Cola nut)",
        },
        {
            name: "caes",
            description: "Цезальпиния (Caesalpinia)",
        },
        {
            name: "abel",
            description: "Гибискус абельмосхус (Abelmoschus)",
        },
        {
            name: "Nodus lymphaticus suis",
            description: "Нодус лимфатикус суис (Nodus lymphaticus suis)",
        },
        {
            name: "placebo",
            description: "Плацебо (Placebo)",
        },
        {
            name: "test",
            description: "Тестудо грэка (Testudo graeca)",
        },
        {
            name: "aspar",
            description: "Аспарагус оффициналис (Asparagus officinalis)",
        },
        {
            name: "aur-m",
            description: "Аурум Муриатикум (Aurum muriaticum)",
        },
        {
            name: "aeg",
            description: "Айва бенгальская (Aegle folia)",
        },
        {
            name: "Thal-acet",
            description:
                "Талиум ацетикум оксидулатум (Thallium aceticum oxydulatum)",
        },
        {
            name: "sinus",
            description: "Синуситис нозод (Sinusitis nosode)",
        },
        {
            name: "art",
            description: "Артериа суис (Arteria suis)",
        },
        {
            name: "vent",
            description: "Вентрикулюс суис (Ventriculus suis)",
        },
        {
            name: "triat",
            description: "Триатема инфестанс (Triatema infestans)",
        },
        {
            name: "svin",
            description: "Свинотрин (Svinotrinum)",
        },
        {
            name: "muc-col",
            description: "Мукоза коли суис (Mucosa coli suis)",
        },
        {
            name: "cig",
            description: "Ядовитое мясо моллюска сигуа (Ciguatera)",
        },
        {
            name: "aorta",
            description: "Аорта (Aorta)",
        },
        {
            name: "both-a",
            description: "Кайсака (Bothrops atrox)",
        },
        {
            name: "bute",
            description: "Бутео (Buteo)",
        },
        {
            name: "chir",
            description: "Австралийская морская оса (Chiron ex fleckeri)",
        },
        {
            name: "curd",
            description: "Курдючный жир овцы (Curdlipid)",
        },
        {
            name: "lac-v-f",
            description: "Лак вакцинум флос (Lac vaccinum flos)",
        },
        {
            name: "ser-o",
            description: "Серум овиле (Serum ovile)",
        },
        {
            name: "lat-h",
            description: "Латродектус газеллити (Latrodectus haselliti)",
        },
        {
            name: "lens",
            description: "Ленс гомеопатия (Lens homeopatia)",
        },
        {
            name: "lumbr",
            description:
                "Лумбрикум террестрис(дождевой червь) (Lumbricum terrestris)",
        },
        {
            name: "onyx",
            description: "Оникс (Onyx)",
        },
        {
            name: "sal",
            description: "Пятнистая саламандра (Salamandra maculosa)",
        },
        {
            name: "ovum",
            description: "Овум (Ovum)",
        },
        {
            name: "sic",
            description: "Сикариус (Sicarius)",
        },
        {
            name: "muc-duc",
            description:
                "Мукоза дуктус холедохи суис (Mucosa ductus choledochi suis)",
        },
        {
            name: "muc-oes",
            description: "Мукоза эзофаги суис (Mucosa oesophagi suis)",
        },
        {
            name: "agk",
            description: "Водяной щитомордник (Agkistodron piscivorus)",
        },
        {
            name: "chond-t",
            description: "Хондодендрон томентозум (Chondodendron tomentosum)",
        },
        {
            name: "ATP",
            description:
                "Аденозинум трифосфорикум (Adenosinum triphosphoricum)",
        },
        {
            name: "trich",
            description: "Трихиноилюм (Trichinoylum)",
        },
        {
            name: "ac-cis",
            description: "Ацидум цис аконитум (Acidum cis-aconiticum)",
        },
        {
            name: "cys",
            description: "Цистеин (Cysteine)",
        },
        {
            name: "coen-a",
            description: "Коэнзим А (Coenzym a)",
        },
        {
            name: "nad",
            description: "Надидум (Nadidum)",
        },
        {
            name: "dam",
            description: "Дамиана (Damiana)",
        },
        {
            name: "ser-r",
            description: "Сереноа репенс (Serenoa repens)",
        },
        {
            name: "mag-or",
            description:
                "Магнезиум оротикум дигидрикум (Magnesium oroticum dihydricum)",
        },
        {
            name: "Gal-gl",
            description: "Галфимия глаука (Galphimia glauca)",
        },
        {
            name: "nast",
            description: "Настуритум Оффициналис (Nasturtium officinalis)",
        },
        {
            name: "conyz",
            description: "Кониза канадензис (Conyza canadensis)",
        },
        {
            name: "cyn-s",
            description: "Цинара сколимус (Cynara scolymus)",
        },
        {
            name: "mel",
            description: "Мелиса лекарственная (Melissa officinalis)",
        },
        {
            name: "tart-s",
            description: "Рвотный камень (Tartarus stibiatus)",
        },
        {
            name: "zinc-chrom",
            description: "Цинкум хромикум (Zincum chromicum)",
        },
        {
            name: "galvan",
            description: "Гальванизмус (Galvanismus)",
        },
        {
            name: "nat-pyr",
            description: "Натриум пирувикум (Natrium pyruvicum)",
        },
        {
            name: "bism-k",
            description: "Бисмутум калиум йодидум (Bismutum kalium iodidum)",
        },
        {
            name: "muc-d",
            description: "Мукоза дуодени суис (Mucosa duodeni suis)",
        },
        {
            name: "spl-s",
            description: "Сплен суис (Splen suis)",
        },
        {
            name: "muc-ves",
            description:
                "Мукоза везице феллеэ суис (Mucosa vesicae felleae suis)",
        },
        {
            name: "muc-oc",
            description: "Мукоза окули суис (Mucosa oculi suis)",
        },
        {
            name: "hyp-s",
            description: "Гипофизис суис (Hypophysis suis)",
        },
        {
            name: "salp",
            description: "Сальпинкс суис (Salpinx suis)",
        },
        {
            name: "uter",
            description: "Утерус суис (Uterus suis)",
        },
        {
            name: "ovar-s",
            description: "Овариум суис (Ovarium suis)",
        },
        {
            name: "plac-t",
            description: "Плацента тоталис суис (Placenta totalis suis)",
        },
        {
            name: "embr",
            description: "Эмбрио тоталис суис (Embryo totalis suis)",
        },
        {
            name: "plb-acet",
            description: "Плюмбум ацетикум (Plumbum aceticum)",
        },
        {
            name: "fun",
            description:
                "Фуникулюс умбиликалис суис (Funiculus umbilicalis suis)",
        },
        {
            name: "disk",
            description:
                "Дискус интервертебралис суис (Discus intervertebralis suis)",
        },
        {
            name: "dien",
            description: "Диэнцефалон суис (Diencephalon suis)",
        },
        {
            name: "col-su",
            description: "Колон суис (Colon suis)",
        },
        {
            name: "ac-lip",
            description: "Ацидум альфа-липоникум (Acidum liponicum)",
        },
        {
            name: "Vit C",
            description: "Ацидум аскорбикум (Acidum ascorbicum)",
        },
        {
            name: "ac-for",
            description: "Ацидум формицикум (Acidum formicicum)",
        },
        {
            name: "ac-al",
            description:
                "Ацидум альфакетоглутарикум (Acidum alphaketoglutaricum)",
        },
        {
            name: "adep",
            description: "Свиное топленое сало (Adeps suillus)",
        },
        {
            name: "aur-s",
            description: "Аурум сульфурикум (Aurum sulphuricum)",
        },
        {
            name: "eun",
            description: "Euonyminum",
        },
        {
            name: "tng",
            description: "Тунгестен (Tungsten)",
        },
        {
            name: "form",
            description: "Формалинум (Formalinum)",
        },
        {
            name: "esch",
            description: "Эшшольция Калифорнийская (Eschscholtzia californica)",
        },
        {
            name: "ves-ur",
            description: "Везика уринария суис (Vesica urinaria suis)",
        },
        {
            name: "helia",
            description: "Гелиантус аннус (Helianthus annuus)",
        },
        {
            name: "cisplat",
            description: "Цисплатинум (Cisplatinum)",
        },
        {
            name: "chrys",
            description: "Хризаробинум (Chrysarobinum)",
        },
        {
            name: "choc",
            description: "Шоколад гомеопатия (Chocolate homeopatia)",
        },
        {
            name: "titan",
            description: "Титаниум металликум (Titanium metallicum)",
        },
        {
            name: "polyp-p",
            description: "Полипорус пиникола (Polyporus pinicola)",
        },
        {
            name: "Lob-d",
            description: "Лобелия дортманна (Lobelia dortmanna)",
        },
        {
            name: "mela",
            description: "Меластома аккермани (Melastoma ackermani)",
        },
        {
            name: "plumbg",
            description: "Плюмбаго литторалис (Plumbago littoralis)",
        },
        {
            name: "musa",
            description: "Муза сапиентум (Musa sapientum)",
        },
        {
            name: "colos",
            description: "Колострум (Colostrum)",
        },
        {
            name: "gaert",
            description: "Гэртнер Бациллус (Gaertner bacillus)",
        },
        {
            name: "cor-od",
            description: "Кораллориза одонториза (Corallorhiza odontorhiza)",
        },
        {
            name: "helx",
            description: "Геликс тоста (Helix tosta)",
        },
        {
            name: "helio",
            description: "Гелиотропиум перувианум (Heliotropium peruvianum)",
        },
        {
            name: "kali-pic",
            description: "Калий пикрикум (Kali picricum)",
        },
        {
            name: "lime",
            description: "Лиместоне (Limestone)",
        },
        {
            name: "lev",
            description: "Левико аква (Levico aqua)",
        },
        {
            name: "pin-l",
            description: "Пинус ламбертиана (Pinus lambertiana)",
        },
        {
            name: "nabal",
            description: "Набалюс серпентариа (Nabalus serpentaria)",
        },
        {
            name: "solan-lyc",
            description: "Соланум ликоперсикум (Solanum lycopersicum)",
        },
        {
            name: "ail-g",
            description: "Аилантус гландулёза (Ailanthus glandulosa)",
        },
        {
            name: "frax-am",
            description: "Фраксинус американа (Fraxinus americana)",
        },
        {
            name: "ser-ang",
            description: "Серум ангуиллэ (Serum anguillae)",
        },
        {
            name: "bac-t",
            description: "Бациллинум тестинум (Bacillinum testium)",
        },
        {
            name: "amyg-p",
            description: "Персик (Persica)",
        },
        {
            name: "stercul",
            description: "Стеркулиа (Sterculia)",
        },
        {
            name: "digitox",
            description: "Дигитоксинум (Digitoxinum)",
        },
        {
            name: "apoc",
            description: "Апоцинум каннабинум (Apocynum cannabinum)",
        },
        {
            name: "thioc-ac",
            description: "Тиоктикум ацидум (Thiocticum acidum)",
        },
        {
            name: "hera",
            description: "Гераклиум сфондилиум (Heraclium sphondylium)",
        },
        {
            name: "Coto b",
            description: "Кото Барк (Coto bark)",
        },
        {
            name: "ozone",
            description: "Озонум (Ozonum)",
        },
        {
            name: "pitu-p",
            description:
                "Питуитария гландула постериор (Pituitaria glandula posterior)",
        },
        {
            name: "pitu-gl",
            description: "Питуитария гландула (Pituitaria glandula)",
        },
        {
            name: "aur-m-k",
            description:
                "Аурум муриатикум калинатум (Aurum muriaticum kalinatum)",
        },
        {
            name: "thymol",
            description: "Тимол (Thymol)",
        },
        {
            name: "hura-c",
            description: "Гура крепитанс (Hura crepitans)",
        },
        {
            name: "home",
            description: "Гомерия коллина (Homeria collina)",
        },
        {
            name: "coll",
            description: "Коллинсония канаденсис (Collinsonia canadensis)",
        },
        {
            name: "ves-s",
            description: "Везика фэллеэ суис (Vesica felleae suis)",
        },
        {
            name: "morg-g.",
            description: "Морган гэртнер (Morgan gaertner)",
        },
        {
            name: "con-b",
            description: "Кониинум броматум (Coniinum bromatum)",
        },
        {
            name: "poth",
            description: "Потос фоетидус (Pothos foetidus)",
        },
        {
            name: "genist",
            description: "Гениста тинкториа (Genista tinctoria)",
        },
        {
            name: "gnaph",
            description: "Гнафалиум полицефалюм (Gnaphalium polycephalum)",
        },
        {
            name: "sac-alb",
            description: "Сахарум Оффицинале (Sacharum officinale)",
        },
        {
            name: "dys-c",
            description: "Дизентери комп (Dysentery comp)",
        },
        {
            name: "anth-o",
            description: "Антоксантум одоратум (Anthoxanthum odoratum)",
        },
        {
            name: "plat-m-n",
            description:
                "Платинум муриатикум натронатум (Platinum muriaticum natronatum)",
        },
        {
            name: "thev",
            description: "Тевеция нерифолия (Thevetia nerifolia)",
        },
        {
            name: "platan",
            description: "Платанус окциденталис (Platanus occidentalis)",
        },
        {
            name: "sol-ps",
            description: "Соланум псеудокапсикум (Solanum pseudocapsicum)",
        },
        {
            name: "iris-fl",
            description: "Ирис флорентина (Iris florentina)",
        },
        {
            name: "arg-c",
            description: "Аргентум цианатум (Argentum cyanatum)",
        },
        {
            name: "ar-c",
            description: "Арека катечу (Areca catechu)",
        },
        {
            name: "sanguin-t",
            description: "Сангвинариум тартарикум (Sanguinarinum tartaricum)",
        },
        {
            name: "castor",
            description: "Кастор экви (Castor equi)",
        },
        {
            name: "gins",
            description: "Гинзенг (Ginseng)",
        },
        {
            name: "parot",
            description: "Паротидинум (Parotidinum)",
        },
        {
            name: "hydrang",
            description: "Гидрангия арборесценс (Hydrangea arborescens)",
        },
        {
            name: "pest",
            description: "Пестинум (Pestinum)",
        },
        {
            name: "cocain",
            description: "Кокаинум гидрохлорикум (Cocainum hydrochloricum)",
        },
        {
            name: "mel-c-s",
            description: "Мел кум сале (Mel cum sale)",
        },
        {
            name: "iris-foe",
            description: "Ирис фоетидиссима (Iris foetidissima)",
        },
        {
            name: "ovi-g-p",
            description: "Ови галлинэ пелликула (Ovi gallinae pellicula)",
        },
        {
            name: "physalia",
            description: "Физалия (Physalia)",
        },
        {
            name: "ant-chl",
            description: "Антимониум хлоратум (Antimonium chloratum)",
        },
        {
            name: "amyl-n",
            description: "Амилнитрозум (Amyl nitrate)",
        },
        {
            name: "septi",
            description: "Септикэминум (Septicaeminum)",
        },
        {
            name: "pulm-v",
            description: "Пульмо вулпис (Pulmo vulpis)",
        },
        {
            name: "methys",
            description: "Метизергидум (Methysergidum)",
        },
        {
            name: "phlor",
            description: "Флоризинум (Phlorizinum)",
        },
        {
            name: "myos-a",
            description: "Миосотис арвенсис (Myosotis arvensis)",
        },
        {
            name: "pic-ac",
            description: "Пикрикум ацидум (Picricum acidum)",
        },
        {
            name: "kali-ma",
            description: "Калий манганикум (Kali manganicum)",
        },
        {
            name: "m-p-a",
            description: "Магнетис поли амбо (Magnetis poli ambo)",
        },
        {
            name: "kaol",
            description: "Каолинум (Kaolinum)",
        },
        {
            name: "quill",
            description: "Квиллая сапонариа (Quillaya saponaria)",
        },
        {
            name: "serp",
            description: "Серпентария аристолохия (Serpentaria aristolochia)",
        },
        {
            name: "stront-n",
            description: "Стронтиум нитрикум (Strontium nitricum)",
        },
        {
            name: "cupr-a",
            description: "Купрессус аустралис (Cupressus australis)",
        },
        {
            name: "bar-cr",
            description: "Барозма крената (Barosma crenata)",
        },
        {
            name: "epil",
            description: "Эпилобиум палюстре (Epilobium palustre)",
        },
        {
            name: "pep",
            description: "Пепсинум (Pepsinum)",
        },
        {
            name: "ran-fi",
            description: "Ранункулюс фикария (Ranunculus ficaria)",
        },
        {
            name: "querc-r",
            description: "Кверкус робур (Quercus robur)",
        },
        {
            name: "queb",
            description: "Квебрахо (Quebracho)",
        },
        {
            name: "prin",
            description: "Принос вертикиллатус (Prinos verticillatus)",
        },
        {
            name: "plb-chr",
            description: "Плюмбум хромикум (Plumbum chromicum)",
        },
        {
            name: "pime",
            description: "Пимента оффициналис (Pimenta officinalis)",
        },
        {
            name: "phor-t",
            description: "Формиум (Phormium tenax)",
        },
        {
            name: "pelarg",
            description: "Пеларгониум рениформе (Pelargonium reniforme)",
        },
        {
            name: "salin",
            description: "Салицинум (Salicinum)",
        },
        {
            name: "pect",
            description: "Пектен Джакобаеус (Pecten jacobaeus)",
        },
        {
            name: "paull-p",
            description: "Пауллиния пинната (Paullinia pinnata)",
        },
        {
            name: "pancreat",
            description: "Панкреатинум (Pancreatinum)",
        },
        {
            name: "ost",
            description: "Острия виргиниана (Ostrya virginiana)",
        },
        {
            name: "onis",
            description: "Онискус азеллюс (Oniscus asellus)",
        },
        {
            name: "oeno",
            description: "Энотера биеннис (Oenothera biennis)",
        },
        {
            name: "nyct",
            description: "Никтантэс ардор тристис (Nyctanthes arbor tristis)",
        },
        {
            name: "nat-s-osum",
            description: "Натриум сульфурозум (Natrum sulphurosum)",
        },
        {
            name: "RNA",
            description: "РНК гомеопатия (Ribonucleinicum acidum)",
        },
        {
            name: "salol",
            description: "Сатол (Salol)",
        },
        {
            name: "nat-sal",
            description: "Натриум салициликум (Natrum salicylicum)",
        },
        {
            name: "verin",
            description: "Вератринум (Veratrinum)",
        },
        {
            name: "epih",
            description: "Epihysterinum",
        },
        {
            name: "diphth",
            description: "Дифтеринум (Diphtherinum)",
        },
        {
            name: "bras-n-o",
            description: "Brassica Napus Oleifera (Brassica napus oleifera)",
        },
        {
            name: "amm-p",
            description: "Аммониум пикрикум (Ammonium picricum)",
        },
        {
            name: "amm-a",
            description: "Аммониум ацетикум (Ammonium aceticum)",
        },
        {
            name: "ag-am",
            description: "Агавэ американа (Agave americana)",
        },
        {
            name: "acet",
            description: "Ацетанидиум (Acetanilidum)",
        },
        {
            name: "verat-n",
            description: "Вератум нигрум (Veratrum nigrum)",
        },
        {
            name: "salx-m",
            description: "Саликс моллиззима (Salix mollissima)",
        },
        {
            name: "tus-fr",
            description: "Туссилаго фрагранс (Tussilago fragrans)",
        },
        {
            name: "tritic",
            description: "Агропирон репенс (Triticum repens)",
        },
        {
            name: "toxi",
            description: "Токсикорфис пугнакс (Toxicophis pugnax)",
        },
        {
            name: "succ",
            description: "Сукцинус пурум (Succinum purum)",
        },
        {
            name: "sphing",
            description: "Сфингурус мартини (Sphingurus martini)",
        },
        {
            name: "solin-acet",
            description: "Соланинум ацетикум (Solaninum aceticum)",
        },
        {
            name: "scorpio",
            description: "Скорпио (Scorpio)",
        },
        {
            name: "santa",
            description: "Санталум альбум (Santalum album)",
        },
        {
            name: "nat-sel",
            description: "Натриум селеникум (Natrum selenicum)",
        },
        {
            name: "nat-ns",
            description: "Натриум нитрозум (Natrum nitrosum)",
        },
        {
            name: "sima",
            description: "Симаруба амара (Simaruba amara)",
        },
        {
            name: "catar",
            description: "Непета катария (Nepeta cataria)",
        },
        {
            name: "cupr-l",
            description: "Купрессус лаусониана (Cupressus lawsoniana)",
        },
        {
            name: "cuc-citr",
            description: "Кукурбита цитруллюс (Cucurbita citrullus)",
        },
        {
            name: "corn-alt",
            description: "Корнус алтектифолиа (Cornus alternifolia)",
        },
        {
            name: "cheir-ch",
            description: "Чеирантус чери (Cheiranthus cheiri)",
        },
        {
            name: "chap-am",
            description: "Чапарро амагрозо (Chaparro amargoso)",
        },
        {
            name: "cetr-isl",
            description: "Цетрария исландская (Cetraria islandica)",
        },
        {
            name: "cer-ox",
            description: "Цериум оксаликум (Cerium oxalicum)",
        },
        {
            name: "calc-ren",
            description: "Калькулюс реналис (Calculus renalis)",
        },
        {
            name: "mag-g",
            description: "Магнезиум глюконикум (Magnesium gluconicum)",
        },
        {
            name: "beta-v",
            description: "Бета вульгарис (Beta vulgaris)",
        },
        {
            name: "benz-od",
            description: "Бензоинум одериферум (Benzoinum oderiferum)",
        },
        {
            name: "bals-p",
            description: "Балсамум перувианум (Balsamum peruvianum)",
        },
        {
            name: "arg-mex",
            description: "Агремоне мексикана (Argemone mexicana)",
        },
        {
            name: "amm-v",
            description: "Аммониум валерианикум (Ammonium valerianicum)",
        },
        {
            name: "ang-l",
            description: "Ангофора ланцеолата (Angophora lanceolata)",
        },
        {
            name: "levot",
            description: "Левотироксинум (Levothyroxinum)",
        },
        {
            name: "merc-pr-r",
            description:
                "Меркуриус прэципитатус рубер (Mercurius praecipitatus ruber)",
        },
        {
            name: "diosma-l",
            description: "Диозма линкарис (Diosma lincaris)",
        },
        {
            name: "euph-p",
            description: "Эуфорбия поликарпа (Euphorbia polycarpa)",
        },
        {
            name: "morg",
            description: "Морган пуре би патерсон (Morgan pure by paterson)",
        },
        {
            name: "lac-v-c",
            description: "Лак вакцинум соагулатум (Lac vaccinum coagulatum)",
        },
        {
            name: "micr",
            description: "Микромерия Дугласа (Micromeria douglasii)",
        },
        {
            name: "merc-k-i",
            description:
                "Меркуриус биниодатус курн кали йодатум (Mercurius biniodatus cum kali iodatum)",
        },
        {
            name: "menth-pu",
            description: "Мента пулегиум (Mentha pulegium)",
        },
        {
            name: "melit",
            description: "Мелитагринум (Melitagrinum)",
        },
        {
            name: "mang-acet",
            description: "Манганум ацетикум (Manganum aceticum)",
        },
        {
            name: "luna",
            description: "Луна (Luna)",
        },
        {
            name: "linu-u.",
            description: "Линум узитатиссимум (Linum usitatissimum)",
        },
        {
            name: "laps",
            description: "Лапсана соммунис (Lapsana communis)",
        },
        {
            name: "lac-cp",
            description: "Лак капринум (Lac caprinum)",
        },
        {
            name: "fab-imbr",
            description: "Фобиана имбриката (Fabiana imbricata)",
        },
        {
            name: "kam",
            description: "Камала (Kamala)",
        },
        {
            name: "hydroph",
            description: "Гидрофис цианоцинктус (Hydrophis cyanocinctus)",
        },
        {
            name: "hepat",
            description: "Гепатика (Hepatica)",
        },
        {
            name: "galan-n",
            description: "Галантус нивалис (Galanthus nivalis)",
        },
        {
            name: "gal-off",
            description: "Галега оффициналис (Galega officinalis)",
        },
        {
            name: "fum-off",
            description: "Фумария оффициналис (Fumaria officinalis)",
        },
        {
            name: "fil",
            description: "Филикс мас (Filix mas)",
        },
        {
            name: "ferr-phos-h",
            description:
                "Феррум фосфорикум гидрикум (Ferrum phosphoricum hydricum)",
        },
        {
            name: "arum-m",
            description: "Арум макулатум (Arum maculatum)",
        },
        {
            name: "euon",
            description: "Эуонимус эуропеа (Euonymus europea)",
        },
        {
            name: "anh",
            description: "Анхалониум левинии (Anhalonium lewinii)",
        },
        {
            name: "anac-oc",
            description: "Анакардиум окцидентале (Anacardium occidentale)",
        },
        {
            name: "atro",
            description:
                "Атропинум пурум сульфурикум (Atropinum purum sulphuricum)",
        },
        {
            name: "aster",
            description: "Астериас рубенс (Asterias rubens)",
        },
        {
            name: "ars-i",
            description: "Арсеникум йодатум (Arsenicum iodatum)",
        },
        {
            name: "ars-h",
            description: "Арсеникум гидрогенисатум (Arsenicum hydrogenisatum)",
        },
        {
            name: "arag",
            description: "Арагаллюс ламберти (Aragallus lamberti)",
        },
        {
            name: "aq-mar",
            description: "Аква марина (Aqua marina)",
        },
        {
            name: "apis",
            description: "Апис меллифика (Apis mellifica)",
        },
        {
            name: "cyn-d",
            description: "Цинодон дактилон (Cynodon dactylon)",
        },
        {
            name: "bar-m",
            description: "Барита муриатика (Baryta muriatica)",
        },
        {
            name: "ambr",
            description: "Амбра гризеа (Ambra grisea)",
        },
        {
            name: "alum-sil",
            description: "Алюминиум силиката (Aluminium silicata)",
        },
        {
            name: "alum-p",
            description: "Алюминиум фосфорика (Aluminium phosphorica)",
        },
        {
            name: "alumn",
            description: "Алюмен (Alumen)",
        },
        {
            name: "allox",
            description: "Аллоксанум (Alloxanum)",
        },
        {
            name: "Clad-pyx",
            description: "Кладония пиксидата (Cladonia pyxidata)",
        },
        {
            name: "Cin-mar",
            description: "Цинерания мартима (Cineraria maritima)",
        },
        {
            name: "agn",
            description: "Агнус кастус (Agnus castus)",
        },
        {
            name: "bar-i",
            description: "Барита йодата (Baryta iodata)",
        },
        {
            name: "bar-s",
            description: "Барита сульфурика (Baryta sulphurica)",
        },
        {
            name: "calc-sil",
            description: "Калькарея силиката (Calcarea silicata)",
        },
        {
            name: "chlf",
            description: "Хлороформум (Chloroformum)",
        },
        {
            name: "cypr",
            description: "Циприпедиум пубесценс (Cypripedium pubescens)",
        },
        {
            name: "cupr-s",
            description: "Купрум сульфурикум (Cuprum sulphuricum)",
        },
        {
            name: "crot-c",
            description: "Кроталюс каскавелла (Crotalus cascavella)",
        },
        {
            name: "corn",
            description: "Корнус цирцината (Cornus circinata)",
        },
        {
            name: "cod",
            description: "Кодеинум пурум (Codeinum purum)",
        },
        {
            name: "cina",
            description: "Цина маритима (Cina maritima)",
        },
        {
            name: "saxitox",
            description: "Саксилоксинум (Saxitoxinum)",
        },
        {
            name: "chin-ar",
            description: "Хининум арсеникозум (Chininum arsenicosum)",
        },
        {
            name: "berb",
            description: "Берберис вульгарис (Berberis vulgaris)",
        },
        {
            name: "cann-s",
            description: "Каннабис сатива (Cannabis sativa)",
        },
        {
            name: "calc-s",
            description: "Калькарея сульфурика (Calcarea sulphurica)",
        },
        {
            name: "calc-p",
            description: "Калькарея фосфорика (Calcarea phosphorica)",
        },
        {
            name: "calc-i",
            description: "Калькарея йодата (Calcarea iodata)",
        },
        {
            name: "calc-f",
            description: "Калькарея флюората (Calcarea fluorata)",
        },
        {
            name: "calad",
            description: "Каладиум сегвинум (Caladium seguinum)",
        },
        {
            name: "cadm-s",
            description: "Кадмиум сульфуратум (Cadmium sulphuratum)",
        },
        {
            name: "buth-aust",
            description: "Бутус аустралис (Buthus australis)",
        },
        {
            name: "acet-ac",
            description: "Ацетикум ацидум (Aceticum acidum)",
        },
        {
            name: "zinc-p",
            description: "Цинкум фосфорикум (Zincum phosphoricum)",
        },
        {
            name: "dros",
            description: "Дрозера ротундифолиа (Drosera rotundifolia)",
        },
        {
            name: "ac-cit",
            description: "Ацидум цитрикум (Acidum citricum)",
        },
        {
            name: "valer",
            description: "Валериана оффициналис (Valeriana officinalis)",
        },
        {
            name: "tub",
            description:
                "Туберкулинум бовинум Кент (Tuberculinum bovinum kent)",
        },
        {
            name: "thuj",
            description: "Туя окциденталис (Thuja occidentalis)",
        },
        {
            name: "tarax",
            description: "Тараксакум оффицинале (Taraxacum officinale)",
        },
        {
            name: "syph",
            description: "Сифилинум (Syphilinum)",
        },
        {
            name: "sulph",
            description: "Сульфур (Sulphur)",
        },
        {
            name: "sul-ac",
            description: "Сульфурикум ацидум (Sulphuricum acidum)",
        },
        {
            name: "stroph",
            description: "Строфантус гиспидус (Strophanthus hispidus)",
        },
        {
            name: "tarent",
            description: "Тарентула гиспаника (Tarentula hispanica)",
        },
        {
            name: "stront-c",
            description: "Стронциум карбоникум (Strontium carbonicum)",
        },
        {
            name: "stram",
            description: "Страмониум (Stramonium)",
        },
        {
            name: "staph",
            description: "Стафизагрия (Staphysagria)",
        },
        {
            name: "spong",
            description: "Спонгия тоста (Spongia tosta)",
        },
        {
            name: "sel",
            description: "Селениум (Selenium)",
        },
        {
            name: "sec",
            description: "Секале корнутум (Secale cornutum)",
        },
        {
            name: "sars",
            description: "Сарсапарилла оффициналис (Sarsaparilla officinalis)",
        },
        {
            name: "sang",
            description: "Сангвинария канадензис (Sanguinaria canadensis)",
        },
        {
            name: "carc",
            description: "Карцинозинум Бурнетт (Carcinosinum burnett)",
        },
        {
            name: "am-c",
            description: "Аммониум карбоникум (Ammonium carbonicum)",
        },
        {
            name: "sol-n",
            description: "Соланум нигрум (Solanum nigrum)",
        },
        {
            name: "ars-met",
            description: "Арсеникум металликум (Arsenicum metallicum)",
        },
        {
            name: "oper",
            description: "Оперкулина турпетум (Operculina turpethum)",
        },
        {
            name: "oena",
            description: "Оенанте кроката (Oenanthe crocata)",
        },
        {
            name: "merc-c",
            description: "Меркуриус коррозивус (Mercurius corrosivus)",
        },
        {
            name: "meli",
            description: "Мелилотус оффициналис (Melilotus officinalis)",
        },
        {
            name: "coloc",
            description: "Колоцинтис (Colocynthis)",
        },
        {
            name: "bapt",
            description: "Баптизия тинктория (Baptisia tinctoria)",
        },
        {
            name: "arum-t",
            description: "Арум трифиллум (Arum triphyllum)",
        },
        {
            name: "androc",
            description:
                "Андроктонос амурреухи гебрэус (Androctonos amurreuxi hebraeus)",
        },
        {
            name: "canth",
            description: "Кантарис везикаториа (Cantharis vesicatoria)",
        },
        {
            name: "all-s",
            description: "Аллиум сативум (Allium sativum)",
        },
        {
            name: "alco",
            description: "Алкоголь гомеопатический (Alcoholus)",
        },
        {
            name: "chin-sal",
            description: "Хининум салициликум (Chininum salicylicum)",
        },
        {
            name: "aesc",
            description: "Эскулюс гиппокастанум (Aesculus hippocastanum)",
        },
        {
            name: "adam",
            description: "Адамас (Adamas)",
        },
        {
            name: "spig-m",
            description: "Спигелия мариландика (Spigelia marilandica)",
        },
        {
            name: "orig",
            description: "Ориганум маиорана (Origanum majorana)",
        },
        {
            name: "cupr",
            description: "Купрум металликум (Cuprum metallicum)",
        },
        {
            name: "cyt-l",
            description: "Цитисус лабурнум (Cytisus laburnum)",
        },
        {
            name: "dulc",
            description: "Дулькамара (Dulcamara)",
        },
        {
            name: "sabad",
            description: "Сабадилла оффициналис (Sabadilla officinalis)",
        },
        {
            name: "cer-s",
            description: "Церебрум суис (Cerebrum suis)",
        },
        {
            name: "test-s",
            description: "Тестис суис (Testis suis)",
        },
        {
            name: "cut-s",
            description: "Кутис суис (Cutis suis)",
        },
        {
            name: "ther",
            description: "Теридион курассавикум (Theridion curassavicum)",
        },
        {
            name: "thal",
            description: "Таллиум металликум (Thallium metallicum)",
        },
        {
            name: "tell",
            description: "Теллуриум (Tellurium)",
        },
        {
            name: "tab",
            description: "Табакум (Tabacum)",
        },
        {
            name: "sul-i",
            description: "Сульфур йодатум (Sulphur iodatum)",
        },
        {
            name: "cor-su",
            description: "Кор суис (Cor suis)",
        },
        {
            name: "ven-m",
            description: "Венус мерценариа (Venus mercenaria)",
        },
        {
            name: "squil",
            description: "Сквилла маритима (Squilla maritima)",
        },
        {
            name: "bar-ox",
            description: "Бариум оксалсукциникум (Barium oxalsuccinicum)",
        },
        {
            name: "seneg",
            description: "Сенега оффициналис (Senega officinalis)",
        },
        {
            name: "saroth",
            description: "Саротамнус скопариус (Sarothamnus scoparius)",
        },
        {
            name: "sabin",
            description: "Сабина оффициналис (Sabina officinalis)",
        },
        {
            name: "rhus-g",
            description: "Рус глабра (Rhus glabra)",
        },
        {
            name: "rheum",
            description: "Реум пальматум (Rheum palmatum)",
        },
        {
            name: "rauw",
            description: "Раувольфия серпентина (Rauwolfia serpentina)",
        },
        {
            name: "thyr",
            description: "Тироидинум (Thyroidinum)",
        },
        {
            name: "verb",
            description:
                "Вербаскум тапсус Ганеманни (Verbascum thapsus hahnemanni)",
        },
        {
            name: "psil",
            description: "Псилоцибе кэрулесценс (Psilocybe caerulescens)",
        },
        {
            name: "cench",
            description: "Ценхрис контортрих (Cenchris contortrix)",
        },
        {
            name: "kali-m",
            description: "Калий муриатикум (Kali muriaticum)",
        },
        {
            name: "com",
            description: "Комокладия дентата (Comocladia dentata)",
        },
        {
            name: "nat-sil",
            description: "Натриум силицикум (Natrum silicicum)",
        },
        {
            name: "aran",
            description: "Аранея диадема (Aranea diadema)",
        },
        {
            name: "myric",
            description: "Мирика церифера (Myrica cerifera)",
        },
        {
            name: "colch",
            description: "Колхикум аутумнале (Colchicum autumnale)",
        },
        {
            name: "cit-l",
            description: "Цитрус лимонум (Citrus limonum)",
        },
        {
            name: "aur-m-n",
            description:
                "Аурум муриатикум натронатум (Aurum muriaticum natronatum)",
        },
        {
            name: "viol-t",
            description: "Виола триколор (Viola tricolor)",
        },
        {
            name: "tanac",
            description: "Танацетум вулгаре (Tanacetum vulgare)",
        },
        {
            name: "merl",
            description: "Меркуриалис переннис (Mercurialis perennis)",
        },
        {
            name: "arund",
            description: "Арундо мауританика (Arundo mauritanica)",
        },
        {
            name: "medul",
            description: "Медулля оссис суис (Medulla ossis suis)",
        },
        {
            name: "all-c",
            description: "Аллиум цепа (Allium cepa)",
        },
        {
            name: "ziz",
            description: "Циция ауреа (Zizia aurea)",
        },
        {
            name: "xan",
            description: "Гантоксилум фрахинеум (Xanthoxylum fraxineum)",
        },
        {
            name: "vip",
            description: "Випера берус (Vipera berus)",
        },
        {
            name: "ptel",
            description: "Птелея трифолиата (Ptelea trifoliata)",
        },
        {
            name: "prun",
            description: "Прунус спиноза (Prunus spinosa)",
        },
        {
            name: "elaps",
            description: "Элапс кораллинус (Elaps corallinus)",
        },
        {
            name: "hydr-ac",
            description: "Гидроцианикум ацидум (Hydrocyanicum acidum)",
        },
        {
            name: "kali-chl",
            description: "Калий хлорикум (Kali chloricum)",
        },
        {
            name: "kali-ar",
            description: "Калий арсеникозум (Kali arsenicosum)",
        },
        {
            name: "jug-r",
            description: "Югланс региа (Juglans regia)",
        },
        {
            name: "jatr",
            description: "Ятрофа уренс (Jatropha urens)",
        },
        {
            name: "indol",
            description: "Индолюм (Indolum)",
        },
        {
            name: "ind",
            description: "Индиум металликум (Indium metallicum)",
        },
        {
            name: "hydrc",
            description: "Гидрокотиле азиатика (Hydrocotyle asiatica)",
        },
        {
            name: "helo",
            description: "Гелодерма горридум (Heloderma horridum)",
        },
        {
            name: "kali-p",
            description: "Калий фосфорикум (Kali phosphoricum)",
        },
        {
            name: "ham",
            description: "Гамамелис макрофилла (Hamamelis macrophylla)",
        },
        {
            name: "gymn",
            description: "Гимнокладус канадензис (Gymnocladus canadensis)",
        },
        {
            name: "guare",
            description: "Гуарея тричилоидес (Guarea trichiloides)",
        },
        {
            name: "guai",
            description: "Гваякум оффицинале (Guaiacum officinale)",
        },
        {
            name: "ferr-p",
            description: "Феррум фосфорикум (Ferrum phosphoricum)",
        },
        {
            name: "ferr-i",
            description: "Феррум йодатум (Ferrum iodatum)",
        },
        {
            name: "ferr-ar",
            description: "Феррум арсеникозум (Ferrum arsenicosum)",
        },
        {
            name: "euphr",
            description: "Эуфразия оффициналис (Euphrasia officinalis)",
        },
        {
            name: "kali-n",
            description: "Калий нитрикум (Kali nitricum)",
        },
        {
            name: "kali-sil",
            description: "Калий силицикум (Kali silicicum)",
        },
        {
            name: "phyt",
            description: "Фитоляка декандра (Phytolacca decandra)",
        },
        {
            name: "merc-i-f",
            description: "Меркуриус йодатус флавус (Mercurius iodatus flavus)",
        },
        {
            name: "onos",
            description: "Оносмодиум виргинианум (Onosmodium virginianum)",
        },
        {
            name: "olnd",
            description: "Олеандер (Oleander)",
        },
        {
            name: "nit-s-d",
            description: "Нитро спиритус дулцис (Nitro spiritus dulcis)",
        },
        {
            name: "nit-ac",
            description: "Нитрикум ацидум (Nitricum acidum)",
        },
        {
            name: "nid",
            description: "Нидус эдулис (Nidus edulis)",
        },
        {
            name: "nat-p",
            description: "Натриум фосфорикум (Natrum phosphoricum)",
        },
        {
            name: "moly",
            description: "Молибденум металликум (Molybdenum metallicum)",
        },
        {
            name: "meny",
            description: "Мениантес трифолиата (Menyanthes trifoliata)",
        },
        {
            name: "kreos",
            description: "Креозотум (Kreosotum)",
        },
        {
            name: "mand",
            description: "Мандрагора оффицинарум (Mandragora officinarum)",
        },
        {
            name: "mag-m",
            description: "Магнезия Муриатика (Magnesia muriatica)",
        },
        {
            name: "lyss",
            description: "Лизинум (Lyssinum)",
        },
        {
            name: "luf-op",
            description: "Люффа оперкулата (Luffa operculata)",
        },
        {
            name: "linu-c",
            description: "Линум катартикум (Linum catharticum)",
        },
        {
            name: "lepi",
            description: "Лепидиум бонариенсе (Lepidium bonariense)",
        },
        {
            name: "lac-h",
            description: "Лак Гуманум (Lac humanum)",
        },
        {
            name: "lac-d",
            description: "Лак вакцинум дефлоратум (Lac vaccinum defloratum)",
        },
        {
            name: "samb",
            description: "Самбукус нигра (Sambucus nigra)",
        },
        {
            name: "ruta",
            description: "Рута гравеоленс (Ruta graveolens)",
        },
        {
            name: "cinnb",
            description: "Циннабарис (Cinnabaris)",
        },
        {
            name: "carbn-o",
            description: "Карбонеум оксигенисатум (Carboneum oxygenisatum)",
        },
        {
            name: "iber",
            description: "Иберис амара (Iberis amara)",
        },
        {
            name: "gels",
            description: "Гельземиум семпервиренс (Gelsemium sempervirens)",
        },
        {
            name: "form-r",
            description: "Формика руфа (Formica rufa)",
        },
        {
            name: "eucal",
            description: "Эукалиптус глобулюс (Eucalyptus globulus)",
        },
        {
            name: "elect",
            description: "Электритас (Electricitas)",
        },
        {
            name: "chlor",
            description: "Хлорум (Chlorum)",
        },
        {
            name: "carbn-s",
            description: "Карбонеум сульфуратум (Carboneum sulphuratum)",
        },
        {
            name: "carb-ac",
            description: "Карболикум ацидум (Carbolicum acidum)",
        },
        {
            name: "lyc",
            description: "Ликоподиум клаватум (Lycopodium clavatum)",
        },
        {
            name: "bell",
            description: "Белладонна (Belladonna)",
        },
        {
            name: "bad",
            description: "Бадяга (Badiaga)",
        },
        {
            name: "ang",
            description: "Ангустура вера (Angustura vera)",
        },
        {
            name: "acon-f",
            description: "Аконитум ферокс (Aconitum ferox)",
        },
        {
            name: "coff",
            description: "Коффея круда (Coffea cruda)",
        },
        {
            name: "benz-ac",
            description: "Бензоикум ацидум (Benzoicum acidum)",
        },
        {
            name: "manc",
            description: "Манцинелла венената (Mancinella venenata)",
        },
        {
            name: "brom",
            description: "Бромиум (Bromium)",
        },
        {
            name: "kali-s",
            description: "Калий сульфурикум (Kali sulphuricum)",
        },
        {
            name: "morph",
            description: "Морфинум ацетикум (Morphinum aceticum)",
        },
        {
            name: "thea",
            description: "Теа синензис (Thea sinensis)",
        },
        {
            name: "stry-p",
            description: "Стрихнинум фосфорикум (Strychninum phosphoricum)",
        },
        {
            name: "cortico",
            description: "Кортикотропинум (Corticotropinum)",
        },
        {
            name: "sin-n",
            description: "Синапис нигра (Sinapis nigra)",
        },
        {
            name: "hydrog",
            description: "Гидрогенум (Hydrogenum)",
        },
        {
            name: "graph",
            description: "Графитес натуралис (Graphites naturalis)",
        },
        {
            name: "zing",
            description: "Зингибер оффицинале (Zingiber officinale)",
        },
        {
            name: "viol-o",
            description: "Виола одората (Viola odorata)",
        },
        {
            name: "sumb",
            description: "Сумбулюс мошатус (Sumbulus moschatus)",
        },
        {
            name: "spig",
            description: "Спигелия антельмия (Spigelia anthelmia)",
        },
        {
            name: "naja",
            description: "Найа трипудианс (Naja tripudians)",
        },
        {
            name: "sil",
            description: "Силика терра (Silica terra)",
        },
        {
            name: "nat-rib",
            description:
                "Натриум рибофлавинум фосфорикум (Natrium riboflavinum phosphoricum)",
        },
        {
            name: "raph",
            description: "Рафанус сативус (Raphanus sativus)",
        },
        {
            name: "plb",
            description: "Плюмбум металликум (Plumbum metallicum)",
        },
        {
            name: "phys",
            description: "Физостигма вененозум (Physostigma venenosum)",
        },
        {
            name: "phos",
            description: "Фосфорус (Phosphorus)",
        },
        {
            name: "penic",
            description: "Пенициллинум (Penicillinum)",
        },
        {
            name: "nitro-o",
            description: "Нитрогенум оксигенатум (Nitrogenum oxygenatum)",
        },
        {
            name: "zinc",
            description: "Цинкум Металликум (Zincum metallicum)",
        },
        {
            name: "rhus-t",
            description: "Рус токсикодендрон (Rhus toxicodendron)",
        },
        {
            name: "hyper",
            description: "Гиперикум перфоратум (Hypericum perforatum)",
        },
        {
            name: "cic",
            description: "Цикута вироза (Cicuta virosa)",
        },
        {
            name: "irid",
            description: "Иридиум металликум (Iridium metallicum)",
        },
        {
            name: "hyos",
            description: "Гиосциамус нигер (Hyoscyamus niger)",
        },
        {
            name: "hura",
            description: "Гура бразилиензис (Hura brasiliensis)",
        },
        {
            name: "fuc",
            description: "Фукус везикулозус (Fucus vesiculosus)",
        },
        {
            name: "coca",
            description: "Кока (Coca)",
        },
        {
            name: "cob-n",
            description: "Кобалтум нитрикум (Cobaltum nitricum)",
        },
        {
            name: "clem",
            description: "Клематис эректа (Clematic erecta)",
        },
        {
            name: "schin",
            description: "Схинус молле (Schinus molle)",
        },
        {
            name: "lil-t",
            description: "Лилиум тигринум (Lilium tigrinum)",
        },
        {
            name: "scarl",
            description: "Скарлатининум (Scarlatininum)",
        },
        {
            name: "bry",
            description: "Бриония альба (Bryonia alba)",
        },
        {
            name: "bar-c",
            description: "Барита карбоника (Baryta carbonica)",
        },
        {
            name: "aur-ar",
            description: "Аурум арсеницикум (Aurum arsenicicum)",
        },
        {
            name: "agar",
            description: "Агарикус мускариус (Agaricus muscarius)",
        },
        {
            name: "acon",
            description: "Аконитум напеллус (Aconitum napellus)",
        },
        {
            name: "nux-m",
            description: "Нукс мошата (Nux moschata)",
        },
        {
            name: "hell",
            description: "Геллеборус нигер (Helleborus niger)",
        },
        {
            name: "lach",
            description: "Лахезис мута (Lachesis muta)",
        },
        {
            name: "mez",
            description: "Мезереум (Mezereum)",
        },
        {
            name: "verat",
            description: "Вератрум альбум (Veratrum album)",
        },
        {
            name: "kali-bi",
            description: "Калий бихромикум (Kali bichromicum)",
        },
        {
            name: "nux-v",
            description: "Нукс вомика (Nux vomica)",
        },
        {
            name: "lycps",
            description: "Ликопус виргиникус (Lycopus virginicus)",
        },
        {
            name: "ign",
            description: "Игнация амара (Ignatia amara)",
        },
        {
            name: "dig",
            description: "Дигиталис пурпуреа (Digitalis purpurea)",
        },
        {
            name: "stann",
            description: "Станнум металликум (Stannum metallicum)",
        },
        {
            name: "chin-s",
            description: "Хининум сульфурикум (Chininum sulphuricum)",
        },
        {
            name: "muc-or",
            description: "Мукоза орис суис (Mucosa oris suis)",
        },
        {
            name: "iod",
            description: "Йодум пурум (Iodum purum)",
        },
        {
            name: "mosch",
            description: "Мосхус мосхиферус (Moschus moschiferus)",
        },
        {
            name: "helon",
            description: "Гелониас диоика (Helonias dioica)",
        },
        {
            name: "cycl",
            description: "Цикламен европейский (Cyclamen europaeum)",
        },
        {
            name: "wies",
            description: "Висбаден аква (Wiesbaden aqua)",
        },
        {
            name: "visc",
            description: "Вискум альбум (Viscum album)",
        },
        {
            name: "sep",
            description: "Сепия оффициналис (Sepia officinalis)",
        },
        {
            name: "op",
            description: "Лауданум (laudanum)",
        },
        {
            name: "nep",
            description: "Непентес дистиллатория (Nepenthes distillatoria)",
        },
        {
            name: "mur-ac",
            description: "Муриатикум ацидум (Muriaticum acidum)",
        },
        {
            name: "fago",
            description: "Фагопирум эскулентум (Fagopyrum esculentum)",
        },
        {
            name: "led",
            description: "Ледум палюстре (Ledum palustre)",
        },
        {
            name: "rumx-a",
            description: "Румекс ацетоза (Rumex acetosa)",
        },
        {
            name: "glon",
            description: "Глоноинум (Glonoinum)",
        },
        {
            name: "kali-i",
            description: "Калий йодатум (Kali iodatum)",
        },
        {
            name: "kali-c",
            description: "Калий карбоникум (Kali carbonicum)",
        },
        {
            name: "kali-br",
            description: "Калий броматум (Kali bromatum)",
        },
        {
            name: "ip",
            description: "Ипекакуана (Ipecacuanha)",
        },
        {
            name: "ichth",
            description: "Ихтиолум (Ichthyolum)",
        },
        {
            name: "hydr",
            description: "Гидрастис канадензис (Hydrastis canadensis)",
        },
        {
            name: "hep",
            description:
                "Гепар сульфурис калкареум (Hepar sulphuris calcareum)",
        },
        {
            name: "fl-ac",
            description: "Флюорикум ацидум (Fluoricum acidum)",
        },
        {
            name: "lac-c",
            description: "Лак канинум (Lac caninum)",
        },
        {
            name: "ferr",
            description: "Феррум металликум (Ferrum metallicum)",
        },
        {
            name: "eup-per",
            description: "Эупаториум перфолиатум (Eupatorium perfoliatum)",
        },
        {
            name: "cupr-ar",
            description: "Купрум арсеникозум (Cuprum arsenicosum)",
        },
        {
            name: "crot-h",
            description: "Кроталюс горридус (Crotalus horridus)",
        },
        {
            name: "croc",
            description: "Крокус сативус (Crocus sativus)",
        },
        {
            name: "con",
            description: "Кониум макулатум (Conium maculatum)",
        },
        {
            name: "coc-c",
            description: "Коккус какти (Coccus cacti)",
        },
        {
            name: "cocc",
            description: "Коккулюс индикус (Cocculus indicus)",
        },
        {
            name: "lac-ac",
            description: "Лактикум ацидум (Lacticum acidum)",
        },
        {
            name: "laur",
            description: "Лауроцерасус оффициналис (Laurocerasus officinalis)",
        },
        {
            name: "chin-m",
            description: "Хининум муриатикум (Chininum muriaticum)",
        },
        {
            name: "ph-ac",
            description: "Фосфорикум ацидум (Phosphoricum acidum)",
        },
        {
            name: "rhod",
            description: "Рододендрон чризантум (Rhododendron chrysanthum)",
        },
        {
            name: "ran-b",
            description: "Ранункулюс бульбозус (Ranunculus bulbosus)",
        },
        {
            name: "querc",
            description: "Кверкус э гландибус (Quercus e glandibus)",
        },
        {
            name: "quas",
            description: "Квассия амара (Quassia amara)",
        },
        {
            name: "puls",
            description: "Пульсатилла нигриканс (Pulsatilla nigricans)",
        },
        {
            name: "psor",
            description: "Псоринум (Psorinum)",
        },
        {
            name: "plat",
            description: "Платинум металликум (Platinum metallicum)",
        },
        {
            name: "petr",
            description: "Петролеум (Petroleum)",
        },
        {
            name: "lob",
            description: "Лобелия инфлята (Lobelia inflata)",
        },
        {
            name: "passi",
            description: "Пассифлора инкарната (Passiflora incarnata)",
        },
        {
            name: "nat-n",
            description: "Натриум нитрикум (Natrum nitricum)",
        },
        {
            name: "nat-m",
            description: "Натриум муриатикум (Natrum muriaticum)",
        },
        {
            name: "nat-c",
            description: "Натриум карбоникум (Natrum carbonicum)",
        },
        {
            name: "merc",
            description: "Меркуриус солюбилис (Mercurius solubilis)",
        },
        {
            name: "meph",
            description: "Мефитис путориус (Mephitis putorius)",
        },
        {
            name: "mag-c",
            description: "Магнезия карбоника (Magnesia carbonica)",
        },
        {
            name: "lup",
            description: "Люпулюс гумулюс (Lupulus humulus)",
        },
        {
            name: "cimic",
            description: "Цимицифуга рацемоза (Cimicifuga racemosa)",
        },
        {
            name: "chin",
            description: "Хина оффициналис (China officinalis)",
        },
        {
            name: "nat-s",
            description: "Натриум сульфурикум (Natrum sulphuricum)",
        },
        {
            name: "anis",
            description: "Анизум стеллатум (Anisum stellatum)",
        },
        {
            name: "arn",
            description: "Арника монтана (Arnica montana)",
        },
        {
            name: "arg-n",
            description: "Аргентум нитрикум (Argentum nitricum)",
        },
        {
            name: "kres",
            description: "Крезолюм (Kresolum)",
        },
        {
            name: "apom",
            description:
                "Апоморфини гидрохлоридум (Apomorphini hydrochloridum)",
        },
        {
            name: "Ilx-a",
            description: "Илекс аквифолиум (Ilex aquifolium)",
        },
        {
            name: "ant-t",
            description: "Антимониум Тартарикум (Antimonium tartaricum)",
        },
        {
            name: "ant-c",
            description: "Антимониум крудум (Antimonium crudum)",
        },
        {
            name: "ferr-pyr",
            description: "Феррум пирофосфорикум (Ferrum pyrophosphoricum)",
        },
        {
            name: "ars-s-f",
            description:
                "Арсеникум сульфуратум флавум (Arsenicum sulphuratum flavum)",
        },
        {
            name: "am-m",
            description: "Аммониум муриатикум (Ammonium muriaticum)",
        },
        {
            name: "alum",
            description: "Алюмина (Alumina)",
        },
        {
            name: "cich-int",
            description: "Цикориум интибум (Cichorium intybus)",
        },
        {
            name: "chrys-ac",
            description: "Хризофаникум ацидум (Chrysophanicum acidum)",
        },
        {
            name: "adon",
            description: "Адонис верналис (Adonis vernalis)",
        },
        {
            name: "absin",
            description: "Абсинтиум (Absinthium)",
        },
        {
            name: "aloe",
            description: "Алоэ сокотрина (Aloe socotrina)",
        },
        {
            name: "sarr",
            description: "Саррацения пурпурная (Sarracenia purpurea)",
        },
        {
            name: "ars",
            description: "Арсеникум альбум (Arsenicum album)",
        },
        {
            name: "asaf",
            description: "Азафетида (Asafoetida)",
        },
        {
            name: "chim",
            description: "Химафила умбеллата (Chimaphila umbellata)",
        },
        {
            name: "camph",
            description: "Камфора (Camphora)",
        },
        {
            name: "chel",
            description: "Хелидониум маюс (Chelidonium majus)",
        },
        {
            name: "cham",
            description: "Хамомилла вульгарис (Chamomilla vulgaris)",
        },
        {
            name: "caust",
            description: "Каустикум Ганеманни (Causticum hahnemanni)",
        },
        {
            name: "card-m",
            description: "Кардуус марианус (Carduus marianus)",
        },
        {
            name: "carb-v",
            description: "Карбо вегетабилис (Carbo vegetabilis)",
        },
        {
            name: "carb-an",
            description: "Карбо анималис (Carbo animalis)",
        },
        {
            name: "caps",
            description: "Капсикум аннуум (Capsicum annuum)",
        },
        {
            name: "cann-i",
            description: "Каннабис индика (Cannabis indica)",
        },
        {
            name: "calc-ar",
            description: "Калькарея арсеникоза (Calcarea arsenicosa)",
        },
        {
            name: "asar",
            description: "Азарум эуропеум (Asarum europaeum)",
        },
        {
            name: "calc",
            description: "Калькарея карбоника (Calcarea carbonica)",
        },
        {
            name: "cadm-br",
            description: "Кадмиум броматум (Cadmium bromatum)",
        },
        {
            name: "bufo",
            description: "Буфо рана (Bufo rana)",
        },
        {
            name: "bov",
            description: "Бовиста ликопердон (Bovista lycoperdon)",
        },
        {
            name: "bor",
            description: "Боракс венета (Borax veneta)",
        },
        {
            name: "bism",
            description: "Бисмутум субнитрикум (Bismuthum subnitricum)",
        },
        {
            name: "aven",
            description: "Авена сатива (Avena sativa)",
        },
        {
            name: "aur",
            description: "Аурум металликум (Aurum metallicum)",
        },
        {
            name: "an-c",
            description: "Анемопсис калифорника (Anemopsis californica)",
        },
        {
            name: "grat",
            description: "Грациола оффициналис (Gratiola officinalis)",
        },
        {
            name: "corn-f",
            description: "Корнус флорида (Cornus florida)",
        },
        {
            name: "lon-x",
            description: "Лоницера ксилостеум (Lonicera xylosteum)",
        },
        {
            name: "sal-ac",
            description: "Салициликум ацидум (Salicylicum acidum)",
        },
        {
            name: "russ",
            description: "Руссула фоетенс (Russula foetens)",
        },
        {
            name: "piloc",
            description:
                "Пилокарпинум гидрохлорикум (Pilocarpinum hydrochloricum)",
        },
        {
            name: "nat-h",
            description: "Натриум гипохлорозум (Natrum hypochlorosum)",
        },
        {
            name: "naphtin",
            description: "Нафталинум (Naphthalinum)",
        },
        {
            name: "merc-pr-a",
            description:
                "Меркуриус преципитатус альбус (Mercurius praecipitatus albus)",
        },
        {
            name: "bel-a",
            description: "Береза пушистая (Betula alba)",
        },
        {
            name: "keroso",
            description: "Керосоленум (Kerosolenum)",
        },
        {
            name: "thal-s",
            description: "Таллиум сульфурикум (Thallium sulphuricum)",
        },
        {
            name: "juni-v",
            description: "Юниперус виргинианус (Juniperus virginianus)",
        },
        {
            name: "hom",
            description: "Хомарус гаммарус (Homarus gammarus)",
        },
        {
            name: "gaul",
            description: "Гаултерия прокумбенс (Gaultheria procumbens)",
        },
        {
            name: "der",
            description: "Деррис пинната (Derris pinnata)",
        },
        {
            name: "chlorp",
            description: "Хлорпромазин (Chlorpromazinum)",
        },
        {
            name: "dat-m",
            description: "Датура метел (Datura metel)",
        },
        {
            name: "cic-m",
            description: "Цикута макулата (Cicuta maculata)",
        },
        {
            name: "carbn-h",
            description: "Карбонеум гидрогенисатум (Carboneum hydrogenisatum)",
        },
        {
            name: "scroph-n",
            description: "Скрофулария нодоза (Scrophularia nodosa)",
        },
        {
            name: "sul-h",
            description: "Сульфур гидрогенисатум (Sulphur hydrogenisatum)",
        },
        {
            name: "astac",
            description: "Астакус флувиатилис (Astacus fluviatilis)",
        },
        {
            name: "calc-acet",
            description: "Калькарея ацетика (Calcarea acetica)",
        },
        {
            name: "conin",
            description: "Кониинум пура (Coniinum pura)",
        },
        {
            name: "physal",
            description: "Физалис алкекенги (Physalis alkekengi)",
        },
        {
            name: "parth",
            description: "Партениум гистерофорус (Parthenium hysterophorus)",
        },
        {
            name: "iodof",
            description: "Йодоформум (Iodoformum)",
        },
        {
            name: "gink",
            description: "Гинкго билоба (Ginkgo biloba)",
        },
        {
            name: "eup-pur",
            description: "Эупаториум пурпуреум (Eupatorium purpureum)",
        },
        {
            name: "coch",
            description: "Кохлеария арморация (Cochlearia armoracia)",
        },
        {
            name: "chin-b",
            description: "Хина боливиана (China (cinchona) boliviana)",
        },
        {
            name: "xero",
            description: "Ксерофиллюм (Xerophyllum)",
        },
        {
            name: "cocci-s",
            description:
                "Кокцинелла септемпунктата (Coccinella septempunctata)",
        },
        {
            name: "mit",
            description: "Митчелла репенс (Mitchella repens)",
        },
        {
            name: "fel",
            description: "Фел таури (Fel tauri)",
        },
        {
            name: "ant-s-a",
            description:
                "Антимониум сульфуратум (Antimonium sulphuratum aureum)",
        },
        {
            name: "ant-i",
            description: "Антимониум йодатум (Antimonium iodatum)",
        },
        {
            name: "til",
            description: "Тилия европея (Tilia europea)",
        },
        {
            name: "rhus-r",
            description: "Рус радиканс (Rhus radicans)",
        },
        {
            name: "chim-m",
            description: "Химафила макулата (Chimaphila maculata)",
        },
        {
            name: "calc-m",
            description: "Калькарея муриатика (Calcarea muriatica)",
        },
        {
            name: "amyg-am",
            description: "Амигдалэ амарэ аква (Amygdalae amarae aqua)",
        },
        {
            name: "cere-s",
            description: "Цереус серпентинус (Cereus serpentinus)",
        },
        {
            name: "ped",
            description: "Педикулюс капитис (Pediculus capitis)",
        },
        {
            name: "vesp",
            description: "Веспа крабро и вульгарис (Vespa crabro and vulgaris)",
        },
        {
            name: "spirae",
            description: "Спирэа ульмариа (Spiraea ulmaria)",
        },
        {
            name: "spira",
            description: "Спирантес аутумналис (Spiranthes autumnalis)",
        },
        {
            name: "sol-t-ae",
            description:
                "Соланум туберозум эгротанс (Solanum tuberosum aegrotans)",
        },
        {
            name: "sapin",
            description: "Сапонинум (Saponinum)",
        },
        {
            name: "ran-s",
            description: "Ранункулюс скелератус (Ranunculus sceleratus)",
        },
        {
            name: "podo",
            description: "Подофиллум пелтатум (Podophyllum peltatum)",
        },
        {
            name: "nym",
            description: "Нимфэа одората (Nymphaea odorata)",
        },
        {
            name: "acon-l",
            description: "Аконитум ликоктонум (Aconitum lycoctonum)",
        },
        {
            name: "ox-a",
            description: "Оксалис Ацетозела (Oxalis acetosella)",
        },
        {
            name: "kiss",
            description: "Киссинген аква (Kissingen aqua)",
        },
        {
            name: "jug-c",
            description: "Югланс цинереа (Juglans cinerea)",
        },
        {
            name: "jac",
            description: "Джакоранда гуаландаи (Jacaranda gualandai)",
        },
        {
            name: "hell-v",
            description: "Геллеборус виридис (Helleborus viridis)",
        },
        {
            name: "hall",
            description: "Галл Аква (Hall aqua)",
        },
        {
            name: "gent-l",
            description: "Генциана лютея (Gentiana lutea)",
        },
        {
            name: "gall-ac",
            description: "Галликум ацидум (Gallicum acidum)",
        },
        {
            name: "daph",
            description: "Дафне индика (Daphne indica)",
        },
        {
            name: "halo",
            description: "Галоперидол гомеопатический (Haloperidol homeo)",
        },
        {
            name: "alet",
            description: "Алетрис фариноза (Aletris farinosa)",
        },
        {
            name: "paeon",
            description: "Пеония оффициналис (Paeonia officinalis)",
        },
        {
            name: "agro",
            description: "Агростемма гитаго (Agrostemma githago)",
        },
        {
            name: "cass-s",
            description: "Кассия софера (Cassia sophera)",
        },
        {
            name: "casc-s",
            description: "Каскара Саграда (Cascara sagrada)",
        },
        {
            name: "card-h",
            description: "Кардиспермум галикакабум (Cardiospermum halicacabum)",
        },
        {
            name: "cand-p",
            description: "Кандида парапсилозис (Candida parapsilosis)",
        },
        {
            name: "lith-c",
            description: "Литиум карбоникум (Lithium carbonicum)",
        },
        {
            name: "jasm",
            description: "Ясминум оффицинале (Jasminum officinale)",
        },
        {
            name: "am-br",
            description: "Аммониум броматум (Ammonium bromatum)",
        },
        {
            name: "benz-n",
            description: "Бензолюм нитрикум (Benzolums nitricum)",
        },
        {
            name: "calc-l-n",
            description:
                "Калькарея лактика натроната (Calcarea lactica natronata)",
        },
        {
            name: "jalapa",
            description: "Ялапа (Jalapa)",
        },
        {
            name: "calc-br",
            description: "Калькарея бромата (Calcarea bromata)",
        },
        {
            name: "muc-r",
            description: "Мукоза ректи суис (Mucosa recti suis)",
        },
        {
            name: "tril",
            description: "Триллиум пендулюм (Trillium pendulum)",
        },
        {
            name: "tep",
            description: "Теплитз агуа (Teplitz agua)",
        },
        {
            name: "nat-oxal",
            description: "Натриум оксалацетикум (Natrium oxalaceticum)",
        },
        {
            name: "chen-a",
            description:
                "Хеноподиум антельминтикум (Chenopodium anthelminthicum)",
        },
        {
            name: "bar-acet",
            description: "Барита ацетика (Baryta acetica)",
        },
        {
            name: "pall",
            description: "Палладиум металликум (Palladium metallicum)",
        },
        {
            name: "cast-v",
            description: "Кастанея веска (Castanea vesca)",
        },
        {
            name: "sabal",
            description: "Сабаль церрулатум (Sabal cerrulatum)",
        },
        {
            name: "pip-n",
            description: "Пипер нигрум (Piper nigrum)",
        },
        {
            name: "cimx",
            description: "Цимекс лектулариус (Cimex lectularius)",
        },
        {
            name: "sol-c",
            description: "Соланум каролиненсе (Solanum carolinense)",
        },
        {
            name: "nat-i",
            description: "Натриум йодатум (Natrum iodatum)",
        },
        {
            name: "aza",
            description: "Азадиракта индика (Azadirachta indica)",
        },
        {
            name: "sarcol-ac",
            description: "Сарколактикум ацидум (Sarcolacticum acidum)",
        },
        {
            name: "phos-pchl",
            description: "Фосфорус муриатикус (Phosphorus muriaticus)",
        },
        {
            name: "abr a",
            description: "Аброма августа (Abroma augusta)",
        },
        {
            name: "lac-f",
            description: "Лак фелинум (Lac felinum)",
        },
        {
            name: "lycpr",
            description: "Ликоперсикум эскулентум (Lycopersicum esculentum)",
        },
        {
            name: "hir",
            description: "Гирудо медициналис (Hirudo medicinalis)",
        },
        {
            name: "Vero-o",
            description: "Вериконика оффициналис (Veronica officinalis)",
        },
        {
            name: "strych-g",
            description: "Стрихнос Гаултериа (Strychnos gaultheria)",
        },
        {
            name: "gua",
            description: "Гвако (Guaco)",
        },
        {
            name: "agar-em",
            description: "Агарикус эметикус (Agaricus emeticus)",
        },
        {
            name: "hypoth",
            description: "Гипоталамус оф те ох (Hypothalamus of the ox)",
        },
        {
            name: "foll",
            description: "Фолликулинум (Folliculinum)",
        },
        {
            name: "lob-s",
            description: "Лобелия сифилитика (Lobelia syphilitica)",
        },
        {
            name: "orot-ac",
            description: "Оротикум ацидум (Oroticum acidum)",
        },
        {
            name: "atha",
            description: "Атаманта кретенсис (Athamanta cretensis)",
        },
        {
            name: "caj",
            description: "Каюпутум (Cajuputum)",
        },
        {
            name: "Lysid",
            description: "Лизидиум (Lysidinum)",
        },
        {
            name: "zinc-pic",
            description: "Цинкум пикрикум (Zincum picricum)",
        },
        {
            name: "sium",
            description: "Сиум латифолиум (Sium latifolium)",
        },
        {
            name: "ferr-pic",
            description: "Феррум пикрикум (Ferrum picricum)",
        },
        {
            name: "aran-s",
            description: "Аранея скиненциа (Aranea scinencia)",
        },
        {
            name: "alf",
            description: "Альфальфа (Alfalfa)",
        },
        {
            name: "ars-s-r",
            description:
                "Арсеникум сульфуратум рубрум (Arsenicum sulphuratum rubrum)",
        },
        {
            name: "cinnam",
            description: "Циннамомум земланикум (Cinnamomum zeylanicum)",
        },
        {
            name: "hed",
            description: "Гедера гелих (Hedera helix)",
        },
        {
            name: "opun-v",
            description: "Опунция вульгарис (Opuntia vulgaris)",
        },
        {
            name: "trio",
            description: "Триостеум перфолиатум (Triosteum perfoliatum)",
        },
        {
            name: "rhodi",
            description: "Родиум металликум (Rhodium metallicum)",
        },
        {
            name: "ery-m",
            description: "Эрингиум маритимум (Eryngium maritimum)",
        },
        {
            name: "cinch",
            description: "Цинхонинум сульфурикум (Cinchoninum sulphuricum)",
        },
        {
            name: "cent",
            description: "Центауреа тагана (Centaurea tagana)",
        },
        {
            name: "erech",
            description: "Эректитес хиерацифолиа (Erechthites hieracifolia)",
        },
        {
            name: "tus-f",
            description: "Туссилаго петаситес (Tussilago petasites)",
        },
        {
            name: "cean",
            description: "Цеанотус американус (Ceanothus americanus)",
        },
        {
            name: "ol-j",
            description: "Олеум экорис аселли (Oleum jecoris aselli)",
        },
        {
            name: "pin-s",
            description: "Пинус силвестрис (Pinus sylvestris)",
        },
        {
            name: "lept",
            description: "Лептандра виргиника (Leptandra virginica)",
        },
        {
            name: "prot",
            description: "Бациллюс Протеус (Bacillus proteus)",
        },
        {
            name: "elat",
            description: "Элатериум оффицинарум (Elaterium officinarum)",
        },
        {
            name: "trach",
            description: "Трахинус драко (Trachinus draco)",
        },
        {
            name: "zinc-s",
            description: "Цинкум сульфурикум (Zincum sulphuricum)",
        },
        {
            name: "tarent-c",
            description: "Тарентула кубензис (Tarentula cubensis)",
        },
        {
            name: "tang",
            description: "Тангхинина вененифера (Tanghinina venenifera)",
        },
        {
            name: "stigm",
            description: "Стигмата мамдис (Stigmata maydis)",
        },
        {
            name: "lat-k",
            description: "Латродектус катипо (Latrodectus katipo)",
        },
        {
            name: "phel",
            description: "Фелландриум акватикум (Phellandrium aquaticum)",
        },
        {
            name: "lacer",
            description: "Лацерта агилис (Lacerta agilis)",
        },
        {
            name: "hippoz",
            description: "Гиппозэнинум (Hippozaeninum)",
        },
        {
            name: "fagu",
            description: "Бук европейский (Fagus silvatica)",
        },
        {
            name: "dubin",
            description: "Дубоизинум (Duboisinum)",
        },
        {
            name: "dat-f",
            description: "Датура ферох (Datura ferox)",
        },
        {
            name: "bomb-pr",
            description: "Бомбикс процессионеа (Bombyx processionea)",
        },
        {
            name: "bol-lu",
            description: "Болетус луридус (Boletus luridus)",
        },
        {
            name: "cast-can",
            description: "Кастореум канадензе (Castoreum canadense)",
        },
        {
            name: "erio",
            description: "Эриодиктион глутинозум (Eriodictyon glutinosum)",
        },
        {
            name: "inul",
            description: "Инула гелениум (Inula helenium)",
        },
        {
            name: "tann-ac",
            description: "Танникум ацидум (Tannicum acidum)",
        },
        {
            name: "elae",
            description: "Элеис гвинеензис (Elaeis guineensis)",
        },
        {
            name: "tamrnd",
            description: "Тамариндус индика (Tamarindus indica)",
        },
        {
            name: "tam",
            description: "Тамус коммунис (Tamus communis)",
        },
        {
            name: "syzyg",
            description: "Сизигиум Джамболанум (Syzygium jambolanum)",
        },
        {
            name: "sulo-ac",
            description: "Сульфурозум ацидум (Sulphurosum acidum)",
        },
        {
            name: "bruc",
            description: "Бруцея антидизентерика (Brucea antidysenterica)",
        },
        {
            name: "trad",
            description: "Традесканция диуретика (Tradescantia diuretica)",
        },
        {
            name: "sac-l",
            description: "Сахарум лактис (Sacharum lactis)",
        },
        {
            name: "gran",
            description: "Гранатум (Granatum)",
        },
        {
            name: "card-b",
            description: "Кардуус бенедиктус (Carduus benedictus)",
        },
        {
            name: "jac-c",
            description: "Джакоранда кароба (Jacaranda caroba)",
        },
        {
            name: "sol-a",
            description: "Соланум арребента (Solanum arrebenta)",
        },
        {
            name: "hydro-v",
            description: "Гидрофиллум виргинианум (Hydrophyllum virginianum)",
        },
        {
            name: "convo-d",
            description: "Конвольвулюс дуартинус (Convolvulus duartinus)",
        },
        {
            name: "myris",
            description: "Миристика себифера (Myristica sebifera)",
        },
        {
            name: "grin",
            description: "Гринделия робуста (Grindelia robusta)",
        },
        {
            name: "peti",
            description: "Петиверия тетрандра (Petiveria tetrandra)",
        },
        {
            name: "ferr-ma",
            description: "Феррум магнетикум (Ferrum magneticum)",
        },
        {
            name: "zinc-m",
            description: "Цинкум муриатикум (Zincum muriaticum)",
        },
        {
            name: "euph-a",
            description: "Эуфорбия амигдалоидес (Euphorbia amygdaloides)",
        },
        {
            name: "propl",
            description: "Прополис (Propolis)",
        },
        {
            name: "rat",
            description: "Ратания перувиана (Ratanhia peruviana)",
        },
        {
            name: "calth",
            description: "Кальта палюстрис (Caltha palustris)",
        },
        {
            name: "sanguin",
            description: "Сангвинаринум пура (Sanguinarinum pura)",
        },
        {
            name: "cedr",
            description: "Квассия цедрон (Cedron)",
        },
        {
            name: "caul",
            description:
                "Каулофиллум таликтроидес (Caulophyllum thalictroides)",
        },
        {
            name: "rham-cath",
            description: "Рамнус катарция (Rhamnus cathartica)",
        },
        {
            name: "rham-cal",
            description: "Рамнус Калифорния (Rhamnus californica)",
        },
        {
            name: "casc",
            description: "Каскарилла (Cascarilla)",
        },
        {
            name: "carl",
            description: "Карлсбад аква (Carlsbad aqua)",
        },
        {
            name: "calo",
            description: "Калотропис гигантеа (Calotropis gigantea)",
        },
        {
            name: "chr-ac",
            description: "Хромикум ацидум (Chromicum acidum)",
        },
        {
            name: "calen",
            description: "Календула оффициналис (Calendula officinalis)",
        },
        {
            name: "both-l",
            description: "Ботропс Ланцеолатус (Bothrops lanceolatus)",
        },
        {
            name: "bol-s",
            description: "Болетус сатанас (Boletus satanas)",
        },
        {
            name: "bol",
            description: "Болетус ларицис (Boletus laricis)",
        },
        {
            name: "bell-p",
            description: "Беллис переннис (Bellis perennis)",
        },
        {
            name: "asc-t",
            description: "Асклепиас тубероза (Asclepias tuberosa)",
        },
        {
            name: "arum-i",
            description: "Арум италикум (Arum italicum)",
        },
        {
            name: "art-v",
            description: "Артемизия вульгарис (Artemisia vulgaris)",
        },
        {
            name: "cerv",
            description: "Цервус бразиликус (Cervus brasilicus)",
        },
        {
            name: "cist",
            description: "Цистус канадензис (Cistus canadensis)",
        },
        {
            name: "aran-ix",
            description: "Аранея Иксобола (Aranea ixobola)",
        },
        {
            name: "DNA",
            description: "ДНК гомеопатическая (Desoxyribonucleinicum acidum)",
        },
        {
            name: "euph-l",
            description: "Эуфорбия латирис (Euphorbia lathyris)",
        },
        {
            name: "eug",
            description: "Евгения ямбоза (Eugenia jambosa)",
        },
        {
            name: "ery-a",
            description: "Эрингиум акватикум (Eryngium aquaticum)",
        },
        {
            name: "erig",
            description: "Эригерон канадензис (Erigeron canadensis)",
        },
        {
            name: "dor",
            description: "Дормфора децемлинеата (Doryphora decemlineata)",
        },
        {
            name: "dirc",
            description: "Дирка палюстрис (Dirca palustris)",
        },
        {
            name: "dios",
            description: "Диоскорея виллоза (Dioscorea villosa)",
        },
        {
            name: "culx",
            description: "Кулекс муска (Culex musca)",
        },
        {
            name: "cit-v",
            description: "Цитрус вульгарис (Citrus vulgaris)",
        },
        {
            name: "cub",
            description: "Кубеба оффициналис (Cubeba officinalis)",
        },
        {
            name: "cor-r",
            description: "Кораллиум рубрум (Corallium rubrum)",
        },
        {
            name: "cop",
            description: "Копаива (Copaiva)",
        },
        {
            name: "Sol",
            description: "Солнечный свет гомеопатия (Sol)",
        },
        {
            name: "Slag",
            description: "Шлак (Slag)",
        },
        {
            name: "Skat",
            description: "Скатолум (Skatolum)",
        },
        {
            name: "coff-t",
            description: "Коффея тоста (Coffea tosta)",
        },
        {
            name: "cob",
            description: "Кобалтум металликум (Cobaltum metallicum)",
        },
        {
            name: "arist-cl",
            description: "Аристолохия клематитис (Aristolochia clematitis)",
        },
        {
            name: "gymn-s",
            description: "Гимнема силвестре (Gymnema sylvestre)",
        },
        {
            name: "ferr-m",
            description: "Феррум муриатикум (Ferrum muriaticum)",
        },
        {
            name: "chlol",
            description: "Хлоралум гидратум (Chloralum hydratum)",
        },
        {
            name: "ox-ac",
            description: "Оксаликум ацидум (Oxalicum acidum)",
        },
        {
            name: "murx",
            description: "Мурекс пурпуреа (Murex purpurea)",
        },
        {
            name: "med",
            description: "Медорринум (Medorrhinum)",
        },
        {
            name: "kali-ox",
            description: "Калий оксаликум (Kali oxalicum)",
        },
        {
            name: "indg",
            description: "Индиго тинкториа (Indigo tinctoria)",
        },
        {
            name: "euph",
            description: "Эуфорбиа (Euphorbia)",
        },
        {
            name: "cur",
            description: "Кураре воорари (Curare woorari)",
        },
        {
            name: "cere-b",
            description: "Цереус бонпландии (Cereus bonplandii)",
        },
        {
            name: "ter",
            description: "Теребинтинэ олеум (Terebinthinae oleum)",
        },
        {
            name: "cact",
            description: "Кактус грандифлорус (Cactus grandiflorus)",
        },
        {
            name: "bac",
            description: "Бациллинум Бурнетт (Bacillinum burnett)",
        },
        {
            name: "aur-i",
            description: "Аурум йодатум (Aurum iodatum)",
        },
        {
            name: "anan",
            description: "Анантерум мурикатум (Anantherum muricatum)",
        },
        {
            name: "anag",
            description: "Анагаллис арвенсис (Anagallis arvensis)",
        },
        {
            name: "aether",
            description: "Этер (Aether)",
        },
        {
            name: "aeth",
            description: "Этуза цинапиум (Aethusa cynapium)",
        },
        {
            name: "tong",
            description: "Тонго (Tongo)",
        },
        {
            name: "par",
            description: "Парис квадрифолиа (Paris quadrifolia)",
        },
        {
            name: "verat-v",
            description: "Вератрум вириде (Veratrum viride)",
        },
        {
            name: "ant-ar",
            description: "Антимониум арсеникозум (Antimonium arsenicosum)",
        },
        {
            name: "muc-j",
            description: "Мукоза еюни суис (Mucosa jejuni suis)",
        },
        {
            name: "eup-ar",
            description: "Эупаторикум ароматикум (Eupatorium aromaticum)",
        },
        {
            name: "agar-ph",
            description: "Агарикус фаллоидес (Agaricus phalloides)",
        },
        {
            name: "act-sp",
            description: "Актея спиката (Actea spicata)",
        },
        {
            name: "acon-c",
            description: "Аконитум каммарум (Aconitum cammarum)",
        },
        {
            name: "abrot",
            description: "Абротанум (Abrotanum)",
        },
        {
            name: "abies-n",
            description: "Абиес нигра (Abies nigra)",
        },
        {
            name: "abies-c",
            description: "Абиес канаденсис (Abies canadensis)",
        },
        {
            name: "m-arct",
            description: "Магнетис полюс арктикус (Magnetis polus arcticus)",
        },
        {
            name: "hipp",
            description: "Хиппоманес (Hippomanes)",
        },
        {
            name: "salx-n",
            description: "Саликс нигра (Salix nigra)",
        },
        {
            name: "rob",
            description: "Робиния псевдоакация (Robinia pseudacacia)",
        },
        {
            name: "insulin",
            description: "Инсулинум (Insulinum)",
        },
        {
            name: "ferul",
            description: "Ферула глаука (Ferula glauca)",
        },
        {
            name: "croto-t",
            description: "Кротон тиглиум (Croton tiglium)",
        },
        {
            name: "cori-r",
            description: "Кориария русцифолия (Coriaria ruscifolia)",
        },
        {
            name: "senec",
            description: "Сенецио ауреус (Senecio aureus)",
        },
        {
            name: "sulfon",
            description: "Сульфоналум (Sulfonalum)",
        },
        {
            name: "eupi",
            description: "Эупионум (Eupionum)",
        },
        {
            name: "gast",
            description: "Гастеин аква (Gastein aqua)",
        },
        {
            name: "calc-caust",
            description: "Калькарея каустика Сегини (Calcarea caustica segini)",
        },
        {
            name: "teucr",
            description: "Теукриум марум верум (Teucrium marum verum)",
        },
        {
            name: "vib",
            description: "Вибурнум опулюс (Viburnum opulus)",
        },
        {
            name: "ust",
            description: "Устилаго майдис (Ustilago maydis)",
        },
        {
            name: "urt-u",
            description: "Уртика уренс (Urtica urens)",
        },
        {
            name: "uran",
            description: "Ураниум нитрикум (Uranium nitricum)",
        },
        {
            name: "upa",
            description: "Упас тиеут (Upas tieut)",
        },
        {
            name: "trom",
            description:
                "Тромбидиум мускэ доместикэ (Trombidium muscae domesticae)",
        },
        {
            name: "thymu",
            description: "Тимус серпиллюм (Thymus serpyllum)",
        },
        {
            name: "tax",
            description: "Таксус бакката (Taxus baccata)",
        },
        {
            name: "vip-a",
            description: "Випера аспис (Vipera aspis)",
        },
        {
            name: "stict",
            description: "Стикта пульмонариа (Sticta pulmonaria)",
        },
        {
            name: "sol-t",
            description: "Соланум туберозум (Solanum tuberosum)",
        },
        {
            name: "sol-m",
            description: "Соланум маммозум (Solanum mammosum)",
        },
        {
            name: "senn",
            description: "Кассия Акутифолия (Cassia acutifolia)",
        },
        {
            name: "scut",
            description: "Скутеллария латерифолия (Scutellaria laterifolia)",
        },
        {
            name: "sant",
            description: "Сантонинум (Santoninum)",
        },
        {
            name: "sanic",
            description: "Саникула аква (Sanicula aqua)",
        },
        {
            name: "samb-c",
            description: "Самбукус канадензис (Sambucus canadensis)",
        },
        {
            name: "vinc",
            description: "Винка минор (Vinca minor)",
        },
        {
            name: "voes",
            description: "Воеслау аква (Voeslau aqua)",
        },
        {
            name: "ran-a",
            description: "Ранункулюс акрис (Ranunculus acris)",
        },
        {
            name: "wild",
            description: "Вилдбад аква (Wildbad aqua)",
        },
        {
            name: "cahin",
            description: "Кахинка расемоза (Cahinca rasemosa)",
        },
        {
            name: "brach",
            description: "Бракиглоттис репенс (Brachyglottis repens)",
        },
        {
            name: "geum-r",
            description: "Геум ривале (Geum rivale)",
        },
        {
            name: "anth",
            description: "Антемис нобилис (Anthemis nobilis)",
        },
        {
            name: "anil",
            description: "Анилинум (Anilinum)",
        },
        {
            name: "am-caust",
            description: "Аммониум каустикум (Ammonium causticum)",
        },
        {
            name: "bapt-c-a",
            description: "Баптизия конфуза ацетика (Baptisia confusa acetica)",
        },
        {
            name: "get",
            description: "Геттмсбург агуа (Gettysburg agua)",
        },
        {
            name: "wye",
            description: "Виеция гелениевидная (Wyethia helenioides)",
        },
        {
            name: "cot",
            description: "Котмледон умбиликус (Cotyledon umbilicus)",
        },
        {
            name: "equis",
            description: "Эквисетум хмемале (Equisetum hyemale)",
        },
        {
            name: "gamb",
            description: "Гамбогиа (Gambogia)",
        },
        {
            name: "pip-m",
            description: "Пипер метистикум (Piper methysticum)",
        },
        {
            name: "zinc-val",
            description: "Цинкум валерианикум (Zincum valerianicum)",
        },
        {
            name: "zinc-o",
            description: "Цинкум оксидатум (Zincum oxydatum)",
        },
        {
            name: "zinc-acet",
            description: "Цинкум ацетикум (Zincum aceticum)",
        },
        {
            name: "yuc",
            description: "Юкка Филаментоза (Yucca filamentosa)",
        },
        {
            name: "rhus-v",
            description: "Рус венената (Rhus venenata)",
        },
        {
            name: "pyrus",
            description: "Пирус американус (Pyrus americanus)",
        },
        {
            name: "gent-c",
            description: "Генциана круциата (Gentiana cruciata)",
        },
        {
            name: "lam",
            description: "Лямиум Альбум (Lamium album)",
        },
        {
            name: "macrin",
            description: "Макротинум (Macrotinum)",
        },
        {
            name: "lol",
            description: "Лолиум темулентум (Lolium temulentum)",
        },
        {
            name: "lob-p",
            description: "Лобелия пурпуресценс (Lobelia purpurescens)",
        },
        {
            name: "lipp",
            description: "Липпспринге аква (Lippspringe aqua)",
        },
        {
            name: "lip",
            description: "Липпия мексикана (Lippia mexicana)",
        },
        {
            name: "lec",
            description: "Лецитинум (Lecithinum)",
        },
        {
            name: "lat-m",
            description: "Латродектус мактанс (Latrodectus mactans)",
        },
        {
            name: "lact",
            description: "Лактука вироза (Lactuca virosa)",
        },
        {
            name: "mang",
            description: "Манганум металликум (Manganum metallicum)",
        },
        {
            name: "lachn",
            description: "Лахнантес тинкториа (Lachnanthes tinctoria)",
        },
        {
            name: "kalm",
            description: "Кальмия латифолия (Kalmia latifolia)",
        },
        {
            name: "kali-cy",
            description: "Калий цианатум (Kali cyanatum)",
        },
        {
            name: "jab",
            description: "Яборанди (Jaborandi)",
        },
        {
            name: "hyosin",
            description: "Гиосинум бромгидрикум (Hyoscinum bromhydricum)",
        },
        {
            name: "hist",
            description: "Гистаминум муриатикум (Histaminum muriaticum)",
        },
        {
            name: "haem",
            description: "Хэматоксилон кампечианум (Haematoxylon campechianum)",
        },
        {
            name: "goss",
            description: "Госсипиум гербацеум (Gossypium herbaceum)",
        },
        {
            name: "mag-s",
            description: "Магнезия сульфурика (Magnesia sulphurica)",
        },
        {
            name: "m-aust",
            description: "Магнетис полюс аустралис (Magnetis polus australis)",
        },
        {
            name: "pyrog",
            description: "Пирогениум (Pyrogenium)",
        },
        {
            name: "nicc",
            description: "Никколум карбоникум (Niccolum carbonicum)",
        },
        {
            name: "pyre-p",
            description: "Пиретрум партениум (Pyrethrum parthenium)",
        },
        {
            name: "puls-n",
            description: "Пульсатилла нутталлиана (Pulsatilla nuttalliana)",
        },
        {
            name: "plan",
            description: "Плантаго маиор (Plantago major)",
        },
        {
            name: "past",
            description: "Пастинака сатива (Pastinaca sativa)",
        },
        {
            name: "osm",
            description: "Осмиум металликум (Osmium metallicum)",
        },
        {
            name: "onop",
            description: "Онопордон акантиум (Onopordon acanthium)",
        },
        {
            name: "ol-an",
            description:
                "Олеум анимале этереум Диппели (Oleum animale aethereum dippeli)",
        },
        {
            name: "nuph",
            description: "Нуфар лютеум (Nuphar luteum)",
        },
        {
            name: "mygal",
            description: "Мигале ласиодора (Mygale lasiodora)",
        },
        {
            name: "menis",
            description: "Мениспермум канаденсе (Menispermum canadense)",
        },
        {
            name: "mill",
            description: "Миллефолиум (Millefolium)",
        },
        {
            name: "pap",
            description: "Папавер Реас (Papaver rhoeas)",
        },
        {
            name: "merc-s",
            description: "Меркуриус сульфурикус (Mercurius sulphuricus)",
        },
        {
            name: "nat-b",
            description: "Натриум броматум (Natrium bromatum)",
        },
        {
            name: "merc-i-r",
            description: "Меркуриус йодатус рубер (Mercurius iodatus ruber)",
        },
        {
            name: "merc-d",
            description: "Меркуриус дулцис (Mercurius dulcis)",
        },
        {
            name: "merc-cy",
            description: "Меркуриус цианатус (Mercurius cyanatus)",
        },
        {
            name: "menth",
            description: "Ментэ пиперита (Menthae piperita)",
        },
    ];
}

@Controller("repertory")
export class RepertoryController {
    constructor(private repertoryService: RepertoryService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/categories")
    getCategoriesAll(): Promise<CategoryDTO[]> {
        return this.repertoryService.getCategoriesAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/categories/bulkCreate")
    async createCategory(@Body() categories: CategoryBodyDTO[]): Promise<void> {
        for (const newCategory of categories) {
            const category = await this.repertoryService.getCategoryByTitle(
                newCategory.title
            );
            if (!category) {
                await this.repertoryService.createCategory(newCategory);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("/medications")
    getMedicationsAll(): Promise<MedicationDTO[]> {
        return this.repertoryService.getMedicationsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications")
    async createMedication(
        @Body() medication: MedicationBodyDTO
    ): Promise<void> {
        await this.repertoryService.createMedication(medication);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/medications/:id")
    removeMedicationById(@Request() req, @Param() { id }): Promise<void> {
        const user_id = req.user.id;
        return this.repertoryService.removeMedicationById(id, user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications/bulkCreate")
    async bulkCreateMedications(
        @Body() medications: MedicationBodyDTO[]
    ): Promise<void> {
        for (const newMedication of medications) {
            const medication = await this.repertoryService.getMedicationByName(
                newMedication.name
            );
            if (!medication) {
                await this.repertoryService.createMedication(newMedication);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications/asyncBulkCreate")
    async bulkCreateByFileMedications(): Promise<void> {
        const medications = getListOfMedicationsToBulkCreate();
        for (const newMedication of medications) {
            const medication = await this.repertoryService.getMedicationByName(
                newMedication.name
            );
            if (!medication) {
                await this.repertoryService.createMedication(newMedication);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms")
    async getSymptoms(@Query() query): Promise<SymptomDTO[]> {
        if (query.parent_id) {
            const parent = await this.repertoryService.getSymptomById(
                query.parent_id
            );
            if (!parent) {
                throw new HttpException(
                    "symptoms/parentDontExist",
                    HttpStatus.BAD_REQUEST
                );
            }
            const childs = await this.repertoryService.getChildSymptomsByParentId(
                parent.symptom_id
            );
            if (query.autoPrefix === "true") {
                return childs.map((symptom) => ({
                    ...symptom,
                    name: `${parent.name}: ${symptom.name}`,
                }));
            }
            return childs;
        }
        if (query.category_id) {
            const arrOfCategories = query.category_id.split(",");
            const result = [];
            for (const category_id of arrOfCategories) {
                const category = await this.repertoryService.getCategoryById(
                    category_id
                );
                if (!category) {
                    throw new HttpException(
                        "symptoms/categoryDontExist",
                        HttpStatus.BAD_REQUEST
                    );
                }
                const symptoms = await this.repertoryService.getParentSymptomsByCategoryId(
                    category.category_id
                );
                if (query.autoPrefix === "true") {
                    result.push(
                        ...symptoms.map((symptom) => ({
                            ...symptom,
                            name: `${category.title}: ${symptom.name}`,
                        }))
                    );
                } else {
                    result.push(...symptoms);
                }
            }
            return result;
        }
        return this.repertoryService.getSymptomsAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/symptoms/:id")
    getSymptomsById(@Param() { id }): Promise<SymptomDTO> {
        return this.repertoryService.getSymptomById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptoms")
    async createSymptom(@Body() symptom: SymptomBodyDTO): Promise<void> {
        await this.repertoryService.createSymptom(symptom);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptoms/bulkCreate")
    async bulkCreateSymptoms(
        @Request() req,
        @Body() body: any[]
    ): Promise<void> {
        const user_id = req.user.id;
        const bulkCreateAndBindingMedications = async (
            meds: string[],
            symptom_id: number
        ): Promise<void> => {
            for (const medication_name of meds) {
                const medication = await this.repertoryService.getMedicationByName(
                    medication_name
                );
                if (medication) {
                    await this.repertoryService.addSymptomToMedication(
                        symptom_id,
                        medication_name,
                        user_id
                    );
                }
            }
        };
        const bulkCreate = async (
            symptoms,
            parent_id: number = null
        ): Promise<void> => {
            if (parent_id) {
                const parent = await this.repertoryService.getSymptomById(
                    parent_id
                );
                if (!parent) {
                    throw new HttpException(
                        "symptoms/parentDontExist",
                        HttpStatus.BAD_REQUEST
                    );
                }
                for (const symptom of symptoms) {
                    const category = await this.repertoryService.getCategoryById(
                        symptom.category_id
                    );
                    if (!category) {
                        throw new HttpException(
                            "symptoms/categoryDontExist",
                            HttpStatus.BAD_REQUEST
                        );
                    }
                    const existingSymptom = await this.repertoryService.getSymptomById(
                        symptom.symptom_id
                    );
                    if (!existingSymptom) {
                        const newSymptom = await this.repertoryService.createSymptom(
                            {
                                ...symptom,
                                parent_id: parent,
                                category_id: category.category_id,
                            }
                        );
                        if (symptom.childs) {
                            await bulkCreate(
                                symptom.childs,
                                newSymptom.symptom_id
                            );
                        }
                        await bulkCreateAndBindingMedications(
                            symptom.medications || [],
                            newSymptom.symptom_id
                        );
                    } else {
                        if (symptom.childs) {
                            await bulkCreate(
                                symptom.childs,
                                existingSymptom.symptom_id
                            );
                        }
                        await bulkCreateAndBindingMedications(
                            symptom.medications || [],
                            existingSymptom.symptom_id
                        );
                    }
                }
            } else {
                for (const symptom of symptoms) {
                    const category = await this.repertoryService.getCategoryById(
                        symptom.category_id
                    );
                    if (!category) {
                        throw new HttpException(
                            "symptoms/categoryDontExist",
                            HttpStatus.BAD_REQUEST
                        );
                    }
                    const existingSymptom = await this.repertoryService.getSymptomById(
                        symptom.symptom_id
                    );
                    if (!existingSymptom) {
                        const newSymptom = await this.repertoryService.createSymptom(
                            {
                                ...symptom,
                                parent_id: parent,
                                category_id: category.category_id,
                            }
                        );
                        if (symptom.childs) {
                            await bulkCreate(
                                symptom.childs,
                                newSymptom.symptom_id
                            );
                        }
                        await bulkCreateAndBindingMedications(
                            symptom.medications || [],
                            newSymptom.symptom_id
                        );
                    } else {
                        if (symptom.childs) {
                            await bulkCreate(
                                symptom.childs,
                                existingSymptom.symptom_id
                            );
                        }
                        await bulkCreateAndBindingMedications(
                            symptom.medications || [],
                            existingSymptom.symptom_id
                        );
                    }
                }
            }
        };
        await bulkCreate(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/medications-by-symptoms")
    async getMedicationBySymptoms(
        @Body() arrOfSymptoms: SymptomDTO[]
    ): Promise<MedicationDTO[]> {
        const getMedications = async (isCustom = false): Promise<any[]> => {
            const arrayOfSymptomsMedications = [];
            const arrayOfMedications = [];
            const arrayOfChildsOfSymptoms = [];
            for (const symptom of arrOfSymptoms) {
                const parents =
                    arrOfSymptoms.filter(
                        (s) => s.parent?.symptom_id === symptom.symptom_id
                    ) || [];
                if (parents.length === 0) {
                    arrayOfChildsOfSymptoms.push(symptom.symptom_id);
                }
            }
            for (const id of arrayOfChildsOfSymptoms) {
                const symptomsMedications = await this.repertoryService.getMedicationsBySymptomId(
                    id,
                    isCustom
                );
                arrayOfSymptomsMedications.push(
                    symptomsMedications.map((m) => {
                        arrayOfMedications.push(m.medication);
                        return m.medication.medication_id;
                    })
                );
            }
            const arrayOfMedicationsId = intersection(
                arrayOfSymptomsMedications
            );
            const result = arrayOfMedicationsId.map((id) =>
                arrayOfMedications.find((m) => m.medication_id === id)
            );
            return result.map((m) => ({
                ...m,
                isCustom,
            }));
        };
        const meds = await getMedications();
        const customMeds = await getMedications(true);
        return meds.concat(customMeds);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/symptom-to-medication")
    async addSymptomsToMedication(
        @Request() req,
        @Body() body: SymptomToMedicationBodyDTO
    ): Promise<void> {
        const user_id = req.user.id;
        const { symptoms, medication_name } = body;
        for (const symptomId of symptoms) {
            await this.repertoryService.addSymptomToMedication(
                symptomId,
                medication_name,
                user_id
            );
        }
    }
}

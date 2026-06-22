import type { Word } from '../types';

export const WORDS: Word[] = [
  // Animals
  { id: 'dog',      categoryId: 'animals',  emoji: '🐕', text: { en: 'Dog',      ar: 'كَلْب',      ur: 'کتا'      }, romanized: { ar: 'kalb',      ur: 'kutta'    } },
  { id: 'cat',      categoryId: 'animals',  emoji: '🐈', text: { en: 'Cat',      ar: 'قِطَّة',     ur: 'بلی'      }, romanized: { ar: 'qitta',     ur: 'billi'    } },
  { id: 'fish',     categoryId: 'animals',  emoji: '🐟', text: { en: 'Fish',     ar: 'سَمَكَة',    ur: 'مچھلی'    }, romanized: { ar: 'samaka',    ur: 'machhli'  } },
  { id: 'bird',     categoryId: 'animals',  emoji: '🐦', text: { en: 'Bird',     ar: 'طَائِر',     ur: 'پرندہ'    }, romanized: { ar: "ta'ir",     ur: 'parinda'  } },
  { id: 'elephant', categoryId: 'animals',  emoji: '🐘', text: { en: 'Elephant', ar: 'فِيل',       ur: 'ہاتھی'    }, romanized: { ar: 'fil',       ur: 'haathi'   } },
  { id: 'lion',     categoryId: 'animals',  emoji: '🦁', text: { en: 'Lion',     ar: 'أَسَد',      ur: 'شیر'      }, romanized: { ar: 'asad',      ur: 'sher'     } },
  { id: 'rabbit',   categoryId: 'animals',  emoji: '🐇', text: { en: 'Rabbit',   ar: 'أَرْنَب',    ur: 'خرگوش'    }, romanized: { ar: 'arnab',     ur: 'khargosh' } },
  { id: 'monkey',   categoryId: 'animals',  emoji: '🐒', text: { en: 'Monkey',   ar: 'قِرْد',      ur: 'بندر'     }, romanized: { ar: 'qird',      ur: 'bandar'   } },

  // Colors
  { id: 'red',      categoryId: 'colors',   emoji: '🔴', text: { en: 'Red',      ar: 'أَحْمَر',    ur: 'لال'      }, romanized: { ar: 'ahmar',     ur: 'laal'     } },
  { id: 'blue',     categoryId: 'colors',   emoji: '🔵', text: { en: 'Blue',     ar: 'أَزْرَق',    ur: 'نیلا'     }, romanized: { ar: 'azraq',     ur: 'neela'    } },
  { id: 'green',    categoryId: 'colors',   emoji: '🟢', text: { en: 'Green',    ar: 'أَخْضَر',    ur: 'سبز'      }, romanized: { ar: 'akhdar',    ur: 'sabz'     } },
  { id: 'yellow',   categoryId: 'colors',   emoji: '🟡', text: { en: 'Yellow',   ar: 'أَصْفَر',    ur: 'پیلا'     }, romanized: { ar: 'asfar',     ur: 'peela'    } },
  { id: 'orange',   categoryId: 'colors',   emoji: '🟠', text: { en: 'Orange',   ar: 'بُرْتُقَالِي', ur: 'نارنجی', }, romanized: { ar: 'burtuqali', ur: 'naaranji' } },
  { id: 'purple',   categoryId: 'colors',   emoji: '🟣', text: { en: 'Purple',   ar: 'بَنَفْسَجِي', ur: 'جامنی',  }, romanized: { ar: 'banafsaji', ur: 'jaamni'   } },
  { id: 'white',    categoryId: 'colors',   emoji: '⬜', text: { en: 'White',    ar: 'أَبْيَض',    ur: 'سفید'     }, romanized: { ar: 'abyad',     ur: 'safed'    } },
  { id: 'black',    categoryId: 'colors',   emoji: '⬛', text: { en: 'Black',    ar: 'أَسْوَد',    ur: 'کالا'     }, romanized: { ar: 'aswad',     ur: 'kala'     } },

  // Numbers
  { id: 'one',      categoryId: 'numbers',  emoji: '1️⃣', text: { en: 'One',      ar: 'وَاحِد',     ur: 'ایک'      }, romanized: { ar: 'wahid',     ur: 'ek'       } },
  { id: 'two',      categoryId: 'numbers',  emoji: '2️⃣', text: { en: 'Two',      ar: 'اثْنَان',    ur: 'دو'       }, romanized: { ar: 'ithnan',    ur: 'do'       } },
  { id: 'three',    categoryId: 'numbers',  emoji: '3️⃣', text: { en: 'Three',    ar: 'ثَلَاثَة',   ur: 'تین'      }, romanized: { ar: 'thalatha',  ur: 'teen'     } },
  { id: 'four',     categoryId: 'numbers',  emoji: '4️⃣', text: { en: 'Four',     ar: 'أَرْبَعَة',  ur: 'چار'      }, romanized: { ar: "arba'a",    ur: 'char'     } },
  { id: 'five',     categoryId: 'numbers',  emoji: '5️⃣', text: { en: 'Five',     ar: 'خَمْسَة',    ur: 'پانچ'     }, romanized: { ar: 'khamsa',    ur: 'paanch'   } },
  { id: 'six',      categoryId: 'numbers',  emoji: '6️⃣', text: { en: 'Six',      ar: 'سِتَّة',     ur: 'چھ'       }, romanized: { ar: 'sitta',     ur: 'cheh'     } },
  { id: 'seven',    categoryId: 'numbers',  emoji: '7️⃣', text: { en: 'Seven',    ar: 'سَبْعَة',    ur: 'سات'      }, romanized: { ar: "sab'a",     ur: 'saat'     } },
  { id: 'eight',    categoryId: 'numbers',  emoji: '8️⃣', text: { en: 'Eight',    ar: 'ثَمَانِيَة', ur: 'آٹھ'      }, romanized: { ar: 'thamaniya', ur: 'aath'     } },
  { id: 'nine',     categoryId: 'numbers',  emoji: '9️⃣', text: { en: 'Nine',     ar: 'تِسْعَة',    ur: 'نو'       }, romanized: { ar: "tis'a",     ur: 'nau'      } },
  { id: 'ten',      categoryId: 'numbers',  emoji: '🔟', text: { en: 'Ten',      ar: 'عَشَرَة',    ur: 'دس'       }, romanized: { ar: 'ashara',    ur: 'das'      } },

  // Food
  { id: 'apple',    categoryId: 'food',     emoji: '🍎', text: { en: 'Apple',    ar: 'تُفَّاحَة',  ur: 'سیب'      }, romanized: { ar: 'tuffaha',   ur: 'saib'     } },
  { id: 'banana',   categoryId: 'food',     emoji: '🍌', text: { en: 'Banana',   ar: 'مَوْزَة',    ur: 'کیلا'     }, romanized: { ar: 'mawza',     ur: 'kela'     } },
  { id: 'milk',     categoryId: 'food',     emoji: '🥛', text: { en: 'Milk',     ar: 'حَلِيب',     ur: 'دودھ'     }, romanized: { ar: 'halib',     ur: 'doodh'    } },
  { id: 'bread',    categoryId: 'food',     emoji: '🍞', text: { en: 'Bread',    ar: 'خُبْز',      ur: 'روٹی'     }, romanized: { ar: 'khubz',     ur: 'roti'     } },
  { id: 'water',    categoryId: 'food',     emoji: '💧', text: { en: 'Water',    ar: 'مَاء',       ur: 'پانی'     }, romanized: { ar: 'ma\'',      ur: 'paani'    } },
  { id: 'egg',      categoryId: 'food',     emoji: '🥚', text: { en: 'Egg',      ar: 'بَيْضَة',    ur: 'انڈہ'     }, romanized: { ar: 'bayda',     ur: 'anda'     } },

  // Family
  { id: 'mother',   categoryId: 'family',   emoji: '👩', text: { en: 'Mother',   ar: 'أُمّ',       ur: 'ماں'      }, romanized: { ar: 'umm',       ur: 'maa'      } },
  { id: 'father',   categoryId: 'family',   emoji: '👨', text: { en: 'Father',   ar: 'أَب',        ur: 'باپ'      }, romanized: { ar: 'ab',        ur: 'baap'     } },
  { id: 'sister',   categoryId: 'family',   emoji: '👧', text: { en: 'Sister',   ar: 'أُخْت',      ur: 'بہن'      }, romanized: { ar: 'ukht',      ur: 'behen'    } },
  { id: 'brother',  categoryId: 'family',   emoji: '👦', text: { en: 'Brother',  ar: 'أَخ',        ur: 'بھائی'    }, romanized: { ar: 'akh',       ur: 'bhai'     } },
  { id: 'baby',     categoryId: 'family',   emoji: '👶', text: { en: 'Baby',     ar: 'طِفْل',      ur: 'بچہ'      }, romanized: { ar: 'tifl',      ur: 'bacha'    } },
];

export function wordsByCategory(categoryId: string): Word[] {
  return WORDS.filter(w => w.categoryId === categoryId);
}

export function wordById(id: string): Word | undefined {
  return WORDS.find(w => w.id === id);
}

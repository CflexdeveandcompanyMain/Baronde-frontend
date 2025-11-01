export interface HeroDataType {
  _id: string;
  categories: string;
  images: { public_id: string; url: string; _id: string }[];
  name: string;
  description: string;
  brand: string;
  keyword: string[];
  price: number;
  discount: number;
  stockQuantity: number;
}

interface filter {
  [key: string]: string;
}

export let filterExp: filter = {
  "double+full_range_speaker": "fullrangespeaker",
  "piano+keyboard": "piano",
  "single+hanging_speaker": "singlespeaker",
  "floor+stage_monitor": "floormonitor",
  "power_surge+sequence": "powersurge",
  "amplifier_rack": "amplifierrack",
  "wired_mic": "wiredmicrophone",
  "wireless_mic": "wirelessmicrophone",
  "Power amplifier": "Power amplifier",
  "Single sub": "Single sub",
  "Double sub": "Double sub",
  "Drums": "Drums",
  "Analog mixer": "Analog mixer",
  "Digital mixer": "Digital mixer",
  "Mixer amplifier": "Mixer amplifier",
  "Equalizer": "Equalizer",
  "Crossover": "Crossover",
  "Compressor": "Compressor",
  "Processor": "Processor",
  "Line array": "Line array",
  "DJ controller": "DJ controller",
  "Powered speaker": "Powered speaker",
  "Combo": "Combo",
  "Public Address system": "Public Address system",
  "Guitars": "Guitars",
  "Guitar effect": "Guitar effect",
  "Speaker management": "Speaker management",
  "Studio microphone": "Studio microphone",
  "Studio speaker": "Studio speaker",
  "Microphone stand": "Microphone stand",
  "Wind instruments": "Wind instruments"
}
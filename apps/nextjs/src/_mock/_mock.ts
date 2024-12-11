import { fSub } from "src/utils/format-time";

import { CONFIG } from "src/config-global";

import {
  _ages,
  _booleans,
  _companyNames,
  _countryNames,
  _courseNames,
  _descriptions,
  _emails,
  _eventNames,
  _fileNames,
  _firstNames,
  _fullAddress,
  _fullNames,
  _id,
  _jobTitles,
  _lastNames,
  _nativeL,
  _nativeM,
  _nativeS,
  _percents,
  _phoneNumbers,
  _postTitles,
  _prices,
  _productNames,
  _ratings,
  _roles,
  _sentences,
  _taskNames,
  _tourNames,
} from "./assets";

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  time: (index: number) => fSub({ days: index, hours: index }),
  boolean: (index: number) => _booleans[index],
  role: (index: number) => _roles[index],
  // Text
  courseNames: (index: number) => _courseNames[index],
  fileNames: (index: number) => _fileNames[index],
  eventNames: (index: number) => _eventNames[index],
  taskNames: (index: number) => _taskNames[index],
  postTitle: (index: number) => _postTitles[index],
  jobTitle: (index: number) => _jobTitles[index],
  tourName: (index: number) => _tourNames[index],
  productName: (index: number) => _productNames[index],
  sentence: (index: number) => _sentences[index],
  description: (index: number) => _descriptions[index],
  // Contact
  email: (index: number) => _emails[index],
  phoneNumber: (index: number) => _phoneNumbers[index],
  fullAddress: (index: number) => _fullAddress[index],
  // Name
  firstName: (index: number) => _firstNames[index],
  lastName: (index: number) => _lastNames[index],
  fullName: (index: number) => _fullNames[index],
  companyNames: (index: number) => _companyNames[index],
  countryNames: (index: number) => _countryNames[index],
  // Number
  number: {
    percent: (index: number) => _percents[index],
    rating: (index: number) => _ratings[index],
    age: (index: number) => _ages[index],
    price: (index: number) => _prices[index],
    nativeS: (index: number) => _nativeS[index],
    nativeM: (index: number) => _nativeM[index],
    nativeL: (index: number) => _nativeL[index],
  },
  // Image
  image: {
    cover: (index: number) =>
      `/assets/images/mock/cover/cover-${index + 1}.webp`,
    avatar: (index: number) =>
      `/assets/images/mock/avatar/avatar-${index + 1}.webp`,
    travel: (index: number) =>
      `/assets/images/mock/travel/travel-${index + 1}.webp`,
    course: (index: number) =>
      `/assets/images/mock/course/course-${index + 1}.webp`,
    company: (index: number) =>
      `/assets/images/mock/company/company-${index + 1}.webp`,
    product: (index: number) =>
      `/assets/images/mock/m-product/product-${index + 1}.webp`,
    portrait: (index: number) =>
      `/assets/images/mock/portrait/portrait-${index + 1}.webp`,
  },
};

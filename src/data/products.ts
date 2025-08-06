import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'bottles',
    name: 'Water Bottles',
    nameAr: 'زجاجات المياه',
    description: 'Individual water bottles for daily hydration',
    descriptionAr: 'زجاجات مياه فردية للترطيب اليومي',
    image: 'https://bf1af2.akinoncloudcdn.com/products/2024/12/28/91824/2565c875-6bf0-4485-aa64-b5cc17d382b2_size3840x3598_cropCenter.jpg',
    slug: 'bottles',
    productCount: 4
  },
  {
    id: 'family-packs',
    name: 'Family Packs',
    nameAr: 'عبوات العائلة',
    description: 'Large family packs and multi-bottle sets',
    descriptionAr: 'عبوات عائلية كبيرة ومجموعات متعددة الزجاجات',
    image: 'https://bf1af2.akinoncloudcdn.com/products/2025/03/29/92147/2a6cc880-76b9-4ed1-b3d2-2934333fd98b_size3840x4690_cropCenter.jpg',
    slug: 'family-packs',
    productCount: 3
  },

  {
    id: 'sparkling',
    name: 'Sparkling Water',
    nameAr: 'المياه الغازية',
    description: 'Refreshing sparkling water varieties',
    descriptionAr: 'أصناف المياه الغازية المنعشة',
    image: 'https://cdn.mafrservices.com/sys-master-root/h98/hf5/52611790340126/1592976_main.jpg?im=Resize=480',
    slug: 'sparkling',
    productCount: 1
  },
  {
    id: 'alkaline',
    name: 'Alkaline Water',
    nameAr: 'المياه القلوية',
    description: 'pH balanced alkaline water for wellness',
    descriptionAr: 'مياه قلوية متوازنة الحموضة للصحة',
    image: 'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001014774_1.jpg',
    slug: 'alkaline',
    productCount: 2
  }
];

export const products: Product[] = [
  // Water Bottles Category
  {
    id: 'mai-dubai-natural',
    name: 'Mai Dubai Natural Water 500ml',
    nameAr: 'مياه مي دبي الطبيعية 500 مل',
    description: 'Premium quality natural drinking water, purified using reverse osmosis technology. Perfect for daily hydration needs.',
    descriptionAr: 'مياه شرب طبيعية عالية الجودة، منقاة باستخدام تقنية التناضح العكسي. مثالية لاحتياجات الترطيب اليومية.',
    price: 3.99,
    originalPrice: 4.50,
    image: 'https://falconfresh.com/media/catalog/product/cache/4b3ecaabb9299e1207decbeedd552ef7/2/2/22857.jpg',
    images: [
      'https://falconfresh.com/media/catalog/product/cache/4b3ecaabb9299e1207decbeedd552ef7/2/2/22857.jpg',
      'https://m.media-amazon.com/images/I/712r3Lx9IML.jpg'
    ],
    category: 'bottles',
    categoryAr: 'زجاجات المياه',
    inStock: true,
    stockQuantity: 145,
    popular: true,
    size: '500ml x 24 Pack',
    sizeAr: '500 مل × 24 عبوة',
    volume: '12L Total',
    volumeAr: '12 لتر إجمالي',
    origin: 'Made in UAE',
    originAr: 'صنع في الإمارات',
    features: ['RO Purified', 'Natural Taste', 'BPA Free', 'Eco Packaging'],
    featuresAr: ['منقى بالتناضح العكسي', 'طعم طبيعي', 'خالي من BPA', 'تغليف صديق للبيئة'],
    rating: 4.5,
    reviews: 298,
    slug: 'mai-dubai-natural-water-500ml'
  },
  {
    id: 'aquafina-500ml',
    name: 'Aquafina Pure Water 500ml',
    nameAr: 'مياه أكوافينا النقية 500 مل',
    description: 'Purified drinking water through rigorous purification process. Trusted international brand available in UAE.',
    descriptionAr: 'مياه شرب منقاة من خلال عملية تنقية صارمة. علامة تجارية دولية موثوقة متوفرة في الإمارات.',
    price: 3.99,
    image: 'https://www.kroger.com/product/images/large/front/0001200050404',
    images: [
      'https://www.kroger.com/product/images/large/front/0001200050404',
      'https://m.media-amazon.com/images/I/61LWxu5Gc3L._UF894,1000_QL80_.jpg'
    ],
    category: 'bottles',
    categoryAr: 'زجاجات المياه',
    inStock: true,
    stockQuantity: 92,
    popular: true,
    size: '500ml x 12 Pack',
    sizeAr: '500 مل × 12 عبوة',
    volume: '6L Total',
    volumeAr: '6 لتر إجمالي',
    origin: 'International Brand',
    originAr: 'علامة تجارية عالمية',
    features: ['Rigorous Purification', 'Trusted Brand', 'Clean Taste', 'BPA Free'],
    featuresAr: ['تنقية صارمة', 'علامة موثوقة', 'طعم نظيف', 'خالي من BPA'],
    rating: 4.3,
    reviews: 156,
    slug: 'aquafina-pure-water-500ml'
  },
  {
    id: 'masafi-pure-1-5l',
    name: 'Masafi Pure Natural Water 1.5L',
    nameAr: 'مياه مصافي النقية الطبيعية 1.5 لتر',
    description: 'Pure natural water from protected underground wells in UAE. Rich in natural minerals and perfect for families.',
    descriptionAr: 'مياه طبيعية نقية من آبار جوفية محمية في الإمارات. غنية بالمعادن الطبيعية ومثالية للعائلات.',
    price: 3.25,
    image: 'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001002146_1.jpg',
    images: [
      'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001002146_1.jpg'
    ],
    category: 'bottles',
    categoryAr: 'زجاجات المياه',
    inStock: true,
    stockQuantity: 78,
    popular: false,
    size: '1.5L',
    sizeAr: '1.5 لتر',
    volume: '1.5L',
    volumeAr: '1.5 لتر',
    origin: 'Underground Wells, UAE',
    originAr: 'آبار جوفية، الإمارات',
    features: ['Natural Minerals', 'Underground Source', 'Single Bottle', 'Quality Tested'],
    featuresAr: ['معادن طبيعية', 'مصدر جوفي', 'زجاجة واحدة', 'مختبرة الجودة'],
    rating: 4.4,
    reviews: 234,
    slug: 'masafi-pure-natural-water-15l'
  },
  {
    id: 'mai-dubai-1-5l',
    name: 'Mai Dubai Natural Water 1.5L',
    nameAr: 'مياه مي دبي الطبيعية 1.5 لتر',
    description: 'Large 1.5L bottle of premium UAE natural water. Perfect for office and home use.',
    descriptionAr: 'زجاجة كبيرة 1.5 لتر من المياه الطبيعية الإماراتية الفاخرة. مثالية للمكتب والاستخدام المنزلي.',
    price: 2.99,
    image: 'https://bf1af2.akinoncloudcdn.com/products/2024/12/28/91957/3dc57217-28ec-4410-9c06-d29dfadc08c4_size3840_cropCenter.jpg',
    images: [
      'https://bf1af2.akinoncloudcdn.com/products/2024/12/28/91957/3dc57217-28ec-4410-9c06-d29dfadc08c4_size3840_cropCenter.jpg'
    ],
    category: 'bottles',
    categoryAr: 'زجاجات المياه',
    inStock: true,
    stockQuantity: 156,
    popular: true,
    size: '1.5L',
    sizeAr: '1.5 لتر',
    volume: '1.5L',
    volumeAr: '1.5 لتر',
    origin: 'Made in UAE',
    originAr: 'صنع في الإمارات',
    features: ['Large Size', 'RO Purified', 'UAE Made', 'Family Size'],
    featuresAr: ['حجم كبير', 'منقى بالتناضح العكسي', 'صنع إماراتي', 'حجم عائلي'],
    rating: 4.6,
    reviews: 187,
    slug: 'mai-dubai-natural-water-15l'
  },

  // Family Packs Category
  {
    id: 'mai-dubai-zero-plus',
    name: 'Mai Dubai ZERO+ Alkaline Water Pack',
    nameAr: 'مياه مي دبي زيرو بلس قلوية عبوة',
    description: 'Zero sodium alkaline water family pack with pH+ for optimal hydration and health benefits. Made in UAE with advanced purification technology.',
    descriptionAr: 'عبوة عائلية من المياه القلوية الخالية من الصوديوم مع درجة حموضة عالية للترطيب الأمثل والفوائد الصحية. مصنوعة في الإمارات بتقنية تنقية متقدمة.',
    price: 18.99,
    image: 'https://bf1af2.akinoncloudcdn.com/products/2024/12/28/91824/2565c875-6bf0-4485-aa64-b5cc17d382b2_size3840x3598_cropCenter.jpg',
    images: [
      'https://bf1af2.akinoncloudcdn.com/products/2024/12/28/91824/2565c875-6bf0-4485-aa64-b5cc17d382b2_size3840x3598_cropCenter.jpg'
    ],
    category: 'family-packs',
    categoryAr: 'عبوات العائلة',
    inStock: true,
    stockQuantity: 89,
    popular: true,
    size: '500ml x 12 Pack',
    sizeAr: '500 مل × 12 عبوة',
    volume: '6L Total',
    volumeAr: '6 لتر إجمالي',
    origin: 'Made in UAE',
    originAr: 'صنع في الإمارات',
    features: ['Zero Sodium', 'Alkaline pH+', 'UAE Made', 'Family Pack'],
    featuresAr: ['خالي من الصوديوم', 'درجة حموضة قلوية', 'صنع إماراتي', 'عبوة عائلية'],
    rating: 4.7,
    reviews: 156,
    slug: 'mai-dubai-zero-plus-alkaline-water-pack'
  },
  {
    id: 'al-ain-mega-pack',
    name: 'Al Ain Bottled Water Mega Pack 1.5L',
    nameAr: 'مياه العين المعبأة عبوة ميجا 1.5 لتر',
    description: 'Low sodium bottled drinking water from Al Ain. Perfect mega pack for families with excellent value for money.',
    descriptionAr: 'مياه شرب معبأة قليلة الصوديوم من العين. عبوة ميجا مثالية للعائلات مع قيمة ممتازة مقابل المال.',
    price: 21.95,
    originalPrice: 24.95,
    image: 'https://bf1af2.akinoncloudcdn.com/products/2025/03/29/92147/2a6cc880-76b9-4ed1-b3d2-2934333fd98b_size3840x4690_cropCenter.jpg',
    images: [
      'https://bf1af2.akinoncloudcdn.com/products/2025/03/29/92147/2a6cc880-76b9-4ed1-b3d2-2934333fd98b_size3840x4690_cropCenter.jpg'
    ],
    category: 'family-packs',
    categoryAr: 'عبوات العائلة',
    inStock: true,
    stockQuantity: 45,
    popular: true,
    size: '1.5L x 12 Bottles',
    sizeAr: '1.5 لتر × 12 زجاجة',
    volume: '18L Total',
    volumeAr: '18 لتر إجمالي',
    origin: 'Al Ain, UAE',
    originAr: 'العين، الإمارات',
    features: ['Low Sodium', 'Mega Offer', 'Family Value Pack', 'Quality Assured'],
    featuresAr: ['قليل الصوديوم', 'عرض ميجا', 'عبوة قيمة عائلية', 'جودة مضمونة'],
    rating: 4.8,
    reviews: 387,
    slug: 'al-ain-bottled-water-mega-pack-15l'
  },
  {
    id: 'masafi-family-pack',
    name: 'Masafi Natural Water Family Pack',
    nameAr: 'مياه مصافي الطبيعية عبوة عائلية',
    description: 'Natural water family pack with 6 large bottles. Perfect for families and small offices with natural mineral content.',
    descriptionAr: 'عبوة عائلية من المياه الطبيعية مع 6 زجاجات كبيرة. مثالية للعائلات والمكاتب الصغيرة مع محتوى معدني طبيعي.',
    price: 16.50,
    image: 'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001002146_1.jpg',
    images: [
      'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001002146_1.jpg'
    ],
    category: 'family-packs',
    categoryAr: 'عبوات العائلة',
    inStock: true,
    stockQuantity: 67,
    popular: false,
    size: '1.5L x 6 Pack',
    sizeAr: '1.5 لتر × 6 عبوات',
    volume: '9L Total',
    volumeAr: '9 لتر إجمالي',
    origin: 'Underground Wells, UAE',
    originAr: 'آبار جوفية، الإمارات',
    features: ['Natural Minerals', 'Underground Source', 'Family Pack', 'Quality Tested'],
    featuresAr: ['معادن طبيعية', 'مصدر جوفي', 'عبوة عائلية', 'مختبرة الجودة'],
    rating: 4.4,
    reviews: 198,
    slug: 'masafi-natural-water-family-pack'
  },

  // Premium Collection Category
  {
    id: 'evian-sports-cap',
    name: 'Evian Natural Mineral Water 750ml',
    nameAr: 'مياه إيفيان المعدنية الطبيعية 750 مل',
    description: 'Premium French natural mineral water from the Alps. Recycled bottle with sports cap for active lifestyle.',
    descriptionAr: 'مياه معدنية طبيعية فرنسية فاخرة من جبال الألب. زجاجة معادة التدوير مع غطاء رياضي لنمط الحياة النشط.',
    price: 6.50,
    image: 'https://cdn.mafrservices.com/sys-master-root/h88/hba/26648967217182/499340_main.jpg?im=Resize=480',
    images: [
      'https://cdn.mafrservices.com/sys-master-root/h88/hba/26648967217182/499340_main.jpg?im=Resize=480'
    ],
    category: 'bottles',
    categoryAr: 'المجموعة المميزة',
    inStock: true,
    stockQuantity: 23,
    popular: false,
    size: '750ml Sports Cap',
    sizeAr: '750 مل غطاء رياضي',
    volume: '0.75L',
    volumeAr: '0.75 لتر',
    origin: 'French Alps',
    originAr: 'جبال الألب الفرنسية',
    features: ['Recycled Bottle', 'Natural Minerals', 'Sports Cap', 'Alpine Source'],
    featuresAr: ['زجاجة معادة التدوير', 'معادن طبيعية', 'غطاء رياضي', 'مصدر جبلي'],
    rating: 4.9,
    reviews: 45,
    slug: 'evian-natural-mineral-water-750ml'
  },
  {
    id: 'volvic-sports-cap',
    name: 'Volvic Natural Mineral Water 750ml',
    nameAr: 'مياه فولفيك المعدنية الطبيعية 750 مل',
    description: 'Natural mineral water from volcanic region of France. With convenient sports cap for on-the-go hydration.',
    descriptionAr: 'مياه معدنية طبيعية من المنطقة البركانية في فرنسا. مع غطاء رياضي مريح للترطيب أثناء التنقل.',
    price: 5.75,
    image: 'https://cdn.mafrservices.com/pim-content/UAE/media/product/1352687/1740387603/1352687_main.jpg?im=Resize=480',
    images: [
      'https://cdn.mafrservices.com/pim-content/UAE/media/product/1352687/1740387603/1352687_main.jpg?im=Resize=480'
    ],
    category: 'bottles',
    categoryAr: 'المجموعة المميزة',
    inStock: true,
    stockQuantity: 31,
    popular: false,
    size: '750ml Sports Cap',
    sizeAr: '750 مل غطاء رياضي',
    volume: '0.75L',
    volumeAr: '0.75 لتر',
    origin: 'Volcanic Region, France',
    originAr: 'منطقة بركانية، فرنسا',
    features: ['Volcanic Source', 'Natural Minerals', 'Sports Cap', 'Premium Quality'],
    featuresAr: ['مصدر بركاني', 'معادن طبيعية', 'غطاء رياضي', 'جودة فاخرة'],
    rating: 4.7,
    reviews: 38,
    slug: 'volvic-natural-mineral-water-750ml'
  },
  {
    id: 'volvic-1-5l',
    name: 'Volvic Natural Mineral Water 1.5L',
    nameAr: 'مياه فولفيك المعدنية الطبيعية 1.5 لتر',
    description: 'Large 1.5L bottle of premium French mineral water. Perfect for sharing and extended hydration needs.',
    descriptionAr: 'زجاجة كبيرة 1.5 لتر من المياه المعدنية الفرنسية الفاخرة. مثالية للمشاركة واحتياجات الترطيب الممتدة.',
    price: 4.95,
    image: 'https://cdn.mafrservices.com/sys-master-root/h56/h94/13976321458206/822_main.jpg?im=Resize=480',
    images: [
      'https://cdn.mafrservices.com/sys-master-root/h56/h94/13976321458206/822_main.jpg?im=Resize=480'
    ],
    category: 'bottles',
    categoryAr: 'المجموعة المميزة',
    inStock: true,
    stockQuantity: 28,
    popular: false,
    size: '1.5L',
    sizeAr: '1.5 لتر',
    volume: '1.5L',
    volumeAr: '1.5 لتر',
    origin: 'France',
    originAr: 'فرنسا',
    features: ['Large Size', 'Natural Minerals', 'French Quality', 'Family Size'],
    featuresAr: ['حجم كبير', 'معادن طبيعية', 'جودة فرنسية', 'حجم عائلي'],
    rating: 4.6,
    reviews: 52,
    slug: 'volvic-natural-mineral-water-15l'
  },

  // Sparkling Water Category
  {
    id: 'oasis-blu-sparkling',
    name: 'Oasis Blu Sparkling Water 250ml',
    nameAr: 'مياه أواسيس بلو الغازية 250 مل',
    description: 'Premium sparkling water with fine bubbles and refreshing taste. Perfect for special occasions and dining.',
    descriptionAr: 'مياه غازية فاخرة مع فقاعات ناعمة وطعم منعش. مثالية للمناسبات الخاصة وتناول الطعام.',
    price: 2.50,
    image: 'https://cdn.mafrservices.com/sys-master-root/h98/hf5/52611790340126/1592976_main.jpg?im=Resize=480',
    images: [
      'https://cdn.mafrservices.com/sys-master-root/h98/hf5/52611790340126/1592976_main.jpg?im=Resize=480'
    ],
    category: 'sparkling',
    categoryAr: 'المياه الغازية',
    inStock: true,
    stockQuantity: 34,
    popular: false,
    size: '250ml',
    sizeAr: '250 مل',
    volume: '0.25L',
    volumeAr: '0.25 لتر',
    origin: 'Premium Collection',
    originAr: 'مجموعة فاخرة',
    features: ['Fine Bubbles', 'Premium Taste', 'Glass Bottle', 'Elegant Design'],
    featuresAr: ['فقاعات ناعمة', 'طعم فاخر', 'زجاجة زجاجية', 'تصميم أنيق'],
    rating: 4.5,
    reviews: 67,
    slug: 'oasis-blu-sparkling-water-250ml'
  },

  // Alkaline Water Category
  {
    id: 'masafi-alkalife',
    name: 'Masafi Alkalife Alkaline Water 1.5L',
    nameAr: 'مياه مصافي ألكالايف القلوية 1.5 لتر',
    description: 'Natural alkaline water with balanced minerals from underground wells. Enhanced with natural alkaline properties for better hydration.',
    descriptionAr: 'مياه قلوية طبيعية مع معادن متوازنة من الآبار الجوفية. محسنة بخصائص قلوية طبيعية لترطيب أفضل.',
    price: 2.75,
    image: 'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001014774_1.jpg',
    images: [
      'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6291001014774_1.jpg'
    ],
    category: 'alkaline',
    categoryAr: 'المياه القلوية',
    inStock: true,
    stockQuantity: 67,
    popular: true,
    size: '1.5L',
    sizeAr: '1.5 لتر',
    volume: '1.5L',
    volumeAr: '1.5 لتر',
    origin: 'Natural Springs, UAE',
    originAr: 'ينابيع طبيعية، الإمارات',
    features: ['Natural Alkaline', 'Mineral Rich', 'Underground Wells', 'pH Balanced'],
    featuresAr: ['قلوية طبيعية', 'غنية بالمعادن', 'آبار جوفية', 'متوازنة الحموضة'],
    rating: 4.6,
    reviews: 189,
    slug: 'masafi-alkalife-alkaline-water-15l'
  },
  {
    id: 'al-ain-alkaline',
    name: 'Al Ain Alkaline Water 1L',
    nameAr: 'مياه العين القلوية 1 لتر',
    description: 'Premium alkaline water from Al Ain with enhanced pH balance. Perfect for daily wellness and hydration.',
    descriptionAr: 'مياه قلوية فاخرة من العين مع توازن درجة حموضة محسن. مثالية للعافية اليومية والترطيب.',
    price: 3.25,
    image: 'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6100851744.jpg',
    images: [
      'https://www.grandiose.ae/media/catalog/product/cache/553a922b2860115f64f7224958d03f95/6/2/6100851744.jpg'
    ],
    category: 'alkaline',
    categoryAr: 'المياه القلوية',
    inStock: true,
    stockQuantity: 52,
    popular: false,
    size: '1L',
    sizeAr: '1 لتر',
    volume: '1L',
    volumeAr: '1 لتر',
    origin: 'Al Ain, UAE',
    originAr: 'العين، الإمارات',
    features: ['Enhanced pH', 'Premium Quality', 'UAE Source', 'Wellness Water'],
    featuresAr: ['درجة حموضة محسنة', 'جودة فاخرة', 'مصدر إماراتي', 'مياه العافية'],
    rating: 4.3,
    reviews: 124,
    slug: 'al-ain-alkaline-water-1l'
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.popular);
};



export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

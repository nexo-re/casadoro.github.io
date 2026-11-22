export const BRAND = 'CasaDoro Interiors';
export const INSTAGRAM_URL = 'https://www.instagram.com/casadoro_interiors/';
export const INSTAGRAM_DM = 'https://ig.me/m/casadoro_interiors';
export const HANDLE = '@casadoro_interiors';
export const PHONE = '09654880621';
export const PHONE_HREF = 'tel:+919654880621';
export const EMAIL = 'casadorointeriors@gmail.com';

export type Service = {
  id: string;
  name: string;
  chip: string;
  blurb: string;
  img: string;
  pos: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: 'interior',
    name: 'Complete interior design',
    chip: 'Complete interior',
    blurb:
      'Layout, colour, lighting and furniture planned together, so the living room, dining area and bedrooms read as one home.',
    img: '/work/sofa-grey.jpg',
    pos: '50% 40%',
    alt: 'Living room with grey channel-tufted sofas, a fluted wood feature wall and cove lighting',
  },
  {
    id: 'sofa',
    name: 'Custom sofas & upholstery',
    chip: 'Sofa',
    blurb:
      'Corner, chesterfield, channel-tufted and curved sofas made in the fabric, size and colour that suit your room.',
    img: '/work/sofa-blue-l.jpg',
    pos: '45% 60%',
    alt: 'Blue L-shaped corner sofa on marble-look flooring',
  },
  {
    id: 'wood',
    name: 'Wooden work & storage',
    chip: 'Wooden work',
    blurb:
      'TV units, display cabinets, shoe racks and under-stair storage, built by our carpenters to fit your walls and awkward corners.',
    img: '/work/understair-storage.jpg',
    pos: '35% 60%',
    alt: 'Dark wood cabinets with a glass-front display unit stepped to follow a staircase',
  },
  {
    id: 'dining',
    name: 'Dining tables & dining rooms',
    chip: 'Dining table',
    blurb:
      'Marble-look and wood-finish tables matched with upholstered chairs, sized for the space you have and the people who sit down.',
    img: '/work/dining-stairs.jpg',
    pos: '35% 75%',
    alt: 'White dining table with velvet upholstered chairs beside a staircase',
  },
  {
    id: 'kitchen',
    name: 'Modular kitchens & pantries',
    chip: 'Kitchen',
    blurb:
      'Drawer base units, wall cabinets and stone-look counters with concealed LED, in finishes that are easy to keep clean.',
    img: '/work/pantry-counter.jpg',
    pos: '45% 55%',
    alt: 'Pantry counter with wood-finish drawers, glass-shutter wall cabinets and warm LED strips',
  },
  {
    id: 'partition',
    name: 'Partitions & screens',
    chip: 'Partition',
    blurb:
      'Brass-finish and slatted screens that divide a room without closing it off, with planter ledges and warm LED edges.',
    img: '/work/living-partition.jpg',
    pos: '75% 50%',
    alt: 'Brass-finish slatted partition with chevron detailing dividing a lit living room',
  },
  {
    id: 'ceiling',
    name: 'False ceilings & lighting',
    chip: 'False ceiling & lighting',
    blurb:
      'Tray and cove ceilings with concealed warm LED, recessed downlights and feature fixtures set out for the room below.',
    img: '/work/sofa-teal.jpg',
    pos: '55% 6%',
    alt: 'Tray ceiling with warm cove lighting, recessed spotlights and a wood-blade ceiling fan',
  },
  {
    id: 'walls',
    name: 'Wallpaper & white wash',
    chip: 'Wallpaper & white wash',
    blurb:
      'Fresh white wash and paint, wallpaper for feature walls and staircases, and wall mouldings that frame the art.',
    img: '/work/sofa-boucle.jpg',
    pos: '90% 18%',
    alt: 'Leaf-pattern wallpaper on a feature wall beside a doorway',
  },
];

export const FULL_HOME = { id: 'full-home', chip: 'Full home' };

export type Work = {
  src: string;
  title: string;
  detail: string;
  alt: string;
  ratio: number;
  scale?: number;
  pos: string;
};

export const works: Work[] = [
  {
    src: '/work/living-partition.jpg',
    title: 'Brass-finish partition',
    detail: 'Slatted metal screen with chevron detailing and planter ledges, dividing the living area under a cove-lit ceiling.',
    alt: 'Living room divided by a brass-finish slatted partition with a cove-lit ceiling and cream sofas',
    ratio: 1,
    pos: '50% 50%',
  },
  {
    src: '/work/sofa-teal.jpg',
    title: 'Teal chesterfield sofa',
    detail: 'Button-tufted L-shaped sofa with a chaise, framed wall mouldings, brass sconces and a cove-lit tray ceiling.',
    alt: 'Teal button-tufted L-shaped sofa under framed wall panels with brass wall lights',
    ratio: 1,
    pos: '50% 50%',
  },
  {
    src: '/work/dining-stairs.jpg',
    title: 'Dining beside the stair',
    detail: 'Marble-look dining table with velvet chairs, a timber shelving unit built into the staircase and brass-capped railings.',
    alt: 'Dining room with a white table, velvet chairs, a wooden shelving unit and a staircase with black and brass railings',
    ratio: 1,
    pos: '50% 50%',
  },
  {
    src: '/work/understair-storage.jpg',
    title: 'Under-stair storage',
    detail: 'Glass-front display cabinet, TV niche and drawer units stepped to follow the line of the staircase.',
    alt: 'Dark wood storage units with a glass display cabinet and open niche under a glass-railed staircase',
    ratio: 1,
    pos: '50% 50%',
  },
  {
    src: '/work/pantry-counter.jpg',
    title: 'Pantry counter',
    detail: 'Wood-finish drawer units, glass-shutter wall cabinets and warm LED strips along the counter and plinth.',
    alt: 'Compact pantry counter with drawer base units, glass-fronted wall cabinets and warm LED lighting',
    ratio: 0.55,
    pos: '50% 50%',
  },
  {
    src: '/work/sofa-grey.jpg',
    title: 'Grey velvet sofas',
    detail: 'Channel-tufted two- and three-seaters beside a fluted wood and LED-lit feature wall with a round display niche.',
    alt: 'Living room with grey channel-tufted sofas, a wood-panelled wall and a backlit round display niche',
    ratio: 1,
    pos: '50% 50%',
  },
  {
    src: '/work/sofa-boucle.jpg',
    title: 'Curved boucle sofa',
    detail: 'A sculpted sofa in cream boucle with a contrasting tan back, made to a custom shape.',
    alt: 'Curved cream boucle sofa with a tan suede back against a white panelled wall',
    ratio: 1,
    pos: '50% 50%',
  },
  {
    src: '/work/sofa-blue-l.jpg',
    title: 'Blue corner sofa',
    detail: 'L-shaped sofa with panelled headrests and slim metal legs, set on marble-look flooring.',
    alt: 'Blue L-shaped corner sofa with panelled headrests and two cushions',
    ratio: 1,
    pos: '50% 50%',
  },
];

export const steps = [
  {
    title: 'Tell us what you need',
    body: 'Send the room list, a floor plan or just a few phone photos. The short brief on this page is enough to start the conversation.',
  },
  {
    title: 'Site visit and measurements',
    body: 'We see the space in person and measure every wall, so furniture and woodwork are made to fit instead of being adjusted later.',
  },
  {
    title: 'Design, materials and quote',
    body: 'You see the layout and choose fabrics, laminates, finishes and lighting, with an affordable quote that matches what was agreed.',
  },
  {
    title: 'Made and fitted',
    body: 'Woodwork, ceilings, partitions and furniture are made and fitted in sequence, and white wash or wallpaper finishes the room.',
  },
  {
    title: 'Handover',
    body: 'We clean up, then walk the room with you — every shutter, drawer, seam and light — before we call it finished.',
  },
];

export const faqs = [
  {
    q: 'What kind of work do you take on?',
    a: 'Complete interior design, custom sofas, wooden work, dining tables, modular kitchens, partitions, false ceilings and lighting, wallpaper and white wash.',
  },
  {
    q: 'Can I ask about just one piece or room?',
    a: 'Yes. Pick whatever applies in the brief — one sofa, a dining table, a single wall or the full home — and we’ll tell you how we can help with it.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Fill in the short brief at the bottom of this page. It copies your details and opens Instagram Direct so you can send them to us in one tap. You can also call or email us. We arrange a site visit, and the quote follows the measurements.',
  },
  {
    q: 'Do I choose the materials and finishes?',
    a: 'You do, with our guidance. Fabrics, laminates, table tops, hardware and lighting are discussed and agreed before anything is made.',
  },
  {
    q: 'Where can I see more of your work?',
    a: 'On Instagram at @casadoro_interiors, where we post new designs and finished rooms. The photos on this page come from our own work.',
  },
];

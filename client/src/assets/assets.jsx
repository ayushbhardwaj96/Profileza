import logo from './logo.svg';

import {
    FaYoutube,
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaPinterest,
    FaSnapchatGhost,
    FaTwitch,
    FaDiscord
} from 'react-icons/fa';

import { FaTiktok } from 'react-icons/fa6';
import image_1 from './image_1.jpg';
import image_2 from './image_2.jpg';
import image_3 from './image_3.jpg';
import image_4 from './image_4.jpg';
import user_profile from './user_profile.png';

export const assets = {
    logo,
    user_profile 
};

export const socialMediaLinks = {
    youtube: 'https://www.youtube.com',
    instagram: 'https://www.instagram.com',
    tiktok: 'https://www.tiktok.com',
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    linkedin: 'https://www.linkedin.com/in',
    pinterest: 'https://www.pinterest.com',
    snapchat: 'https://www.snapchat.com/add',
    twitch: 'https://www.twitch.tv',
    discord: 'https://discord.com/users',
};

export function getProfileLink(platform, username) {
    if (!platform || !username) return null;
    const key = platform.toLowerCase();
    const base = socialMediaLinks[key];
    if (!base) return null;
    const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
    switch (key) {
        case 'linkedin':
            return `${base}/${cleanUsername}`;
        case 'youtube':
            return `https://www.youtube.com/@${cleanUsername}`;
        case 'snapchat':
            return `${base}/${cleanUsername}`;
        case 'discord':
            return `${base}/${cleanUsername}`;
        default:
            return `${base}/${cleanUsername}`;
    }
}

export const platformIcons = {
    youtube: <FaYoutube color='#FF0000' className='bg-[#FF000010] size-10 p-2 rounded' />,
    instagram: <FaInstagram color='#E1306C' className='bg-[#E1306C10] size-10 p-2 rounded' />,
    tiktok: <FaTiktok color='#000000' className='bg-[#00000010] size-10 p-2 rounded' />,
    facebook: <FaFacebook color='#1877F2' className='bg-[#1877F210] size-10 p-2 rounded' />,
    twitter: <FaTwitter color='#1DA1F2' className='bg-[#1DA1F210] size-10 p-2 rounded' />,
    linkedin: <FaLinkedin color='#0077B5' className='bg-[#0077B510] size-10 p-2 rounded' />,
    pinterest: <FaPinterest color='#E60023' className='bg-[#E6002310] size-10 p-2 rounded' />,
    snapchat: <FaSnapchatGhost color='#FFFC00' className='bg-[#FFFC0010] size-10 p-2 rounded' />,
    twitch: <FaTwitch color='#9146FF' className='bg-[#9146FF10] size-10 p-2 rounded' />,
    discord: <FaDiscord color='#5865F2' className='bg-[#5865F210] size-10 p-2 rounded' />,
};

export const dummyUsers = [
    {
        id: 'user_1',
        email: 'creator1@example.com',
        name: 'Alex Johnson',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'user_2',
        email: 'creator2@example.com',
        name: 'Sophia Lee',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'user_3',
        email: 'creator3@example.com',
        name: 'David Kim',
        image: 'https://randomuser.me/api/portraits/men/72.jpg',
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
];

export const dummyListings = [
    {
        id: 'listing_1',
        ownerId: 'user_1',
        title: 'Tech YouTube Channel with 120k Subscribers',
        platform: 'youtube',
        username: 'TechSavvyAlex',
        followers_count: 120000,
        engagement_rate: 4,
        monthly_views: 850000,
        niche: 'tech',
        price: 7500,
        description: 'Established tech channel with high engagement and steady ad revenue. Includes full transfer and assets.',
        verified: true,
        monetized: true,
        country: 'USA',
        age_range: '18-34',
        status: 'active',
        featured: true,
        images: [image_1, image_2, image_3, image_4],
        platformAssured: true,
        owner: dummyUsers[0],
        isCredentialSubmitted: true,
        isCredentialVerified: true,
        isCredentialChanged: true,
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'listing_2',
        ownerId: 'user_2',
        title: 'Travel Instagram Page with 50k Followers',
        platform: 'instagram',
        username: 'wanderlust.sophia',
        followers_count: 50000,
        engagement_rate: 3,
        monthly_views: 210000,
        niche: 'travel',
        price: 2800,
        description: 'Beautifully curated travel page with loyal audience and collaboration history with travel brands.',
        verified: false,
        monetized: false,
        country: 'Canada',
        age_range: '25-44',
        status: 'active',
        featured: false,
        images: [image_1, image_2, image_3, image_4],
        platformAssured: false,
        owner: dummyUsers[1],
        isCredentialSubmitted: true,
        isCredentialVerified: false,
        isCredentialChanged: false,
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },

    {
        id: 'listing_4',
        ownerId: 'user_1',
        title: 'Fashion Pinterest Board with 90k Monthly Views',
        platform: 'pinterest',
        username: 'stylebyalex',
        followers_count: 15000,
        engagement_rate: 4,
        monthly_views: 90000,
        niche: 'fashion',
        price: 950,
        description: 'Highly active fashion and design inspiration board with organic traffic and steady audience growth.',
        verified: false,
        monetized: false,
        country: 'USA',
        age_range: '25-54',
        status: 'active',
        featured: false,
        images: [image_1, image_2, image_3, image_4],
        platformAssured: false,
        owner: dummyUsers[2],
        isCredentialSubmitted: true,
        isCredentialVerified: true,
        isCredentialChanged: false,
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'listing_3',
        ownerId: 'user_3',
        title: 'Fitness TikTok with 300k Followers',
        platform: 'tiktok',
        username: 'fitwithdavid',
        followers_count: 300000,
        engagement_rate: 5,
        monthly_views: 2500000,
        niche: 'fitness',
        price: 12000,
        description: 'Viral fitness content and consistent posting schedule. Brand deals available and audience in the US & UK.',
        verified: true,
        monetized: true,
        country: 'UK',
        age_range: '18-34',
        status: 'pending',
        featured: true,
        images: [image_1, image_2, image_3, image_4],
        platformAssured: true,
        owner: dummyUsers[0],
        isCredentialSubmitted: false,
        isCredentialVerified: false,
        isCredentialChanged: false,
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'listing_5',
        ownerId: 'user_2',
        title: 'Music Twitch Channel with 20k Followers',
        platform: 'twitch',
        username: 'SophiaBeats',
        followers_count: 20000,
        engagement_rate: 6,
        monthly_views: 600000,
        niche: 'music',
        price: 3800,
        description: 'Active music streaming channel with loyal audience and consistent income from subscribers and donations.',
        verified: true,
        monetized: true,
        country: 'Australia',
        age_range: '18-44',
        status: 'sold',
        featured: false,
        images: [image_1, image_2, image_3, image_4],
        platformAssured: true,
        owner: dummyUsers[0],
        isCredentialSubmitted: true,
        isCredentialVerified: true,
        isCredentialChanged: true,
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
];

export const dummyMessages = [
    {
        id: 'msg104',
        chatId: 'chat_1',
        sender_id: 'user_1',
        message: 'Hi, is this YouTube channel still available?',
        createdAt: '2025-10-29T09:00:00.000Z',
    },
    {
        id: 'msg105',
        chatId: 'chat_1',
        sender_id: 'user_2',
        message: "Yes, it's still available. Are you interested in buying?",
        createdAt: '2025-10-29T09:02:00.000Z',
    },
    {
        id: 'msg106',
        chatId: 'chat_1',
        sender_id: 'user_1',
        message: 'Can you share recent analytics screenshots?',
        createdAt: '2025-10-29T09:05:00.000Z',
    },
];

export const dummyChats = [
    {
        id: 'chat_1',
        chatUserId: 'user_1',
        ownerUserId: 'user_2',
        listingId: 'listing_1',
        active: true,
        lastMessage: 'Hi, is this YouTube channel still available?',
        isLastMessageRead: false,
        createdAt: '2025-10-28T12:34:56.000Z',
        updatedAt: '2025-10-29T09:10:00.000Z',
        messages: dummyMessages,
        ownerUser: dummyUsers[0],
        chatUser: dummyUsers[1],
        listing: dummyListings[0],
    },
    {
        id: 'chat_2',
        chatUserId: 'user_2',
        ownerUserId: 'user_3',
        listingId: 'listing_2',
        active: true,
        lastMessage: 'Hey, is your Instagram fitness page for sale?',
        isLastMessageRead: true,
        createdAt: '2025-10-28T15:30:00.000Z',
        updatedAt: '2025-10-29T10:00:00.000Z',
        messages: dummyMessages,
        ownerUser: dummyUsers[1],
        chatUser: dummyUsers[2],
        listing: dummyListings[1],
    },
];

export const dummyOrders = [
    {
        id: '37410546-9b88-4917-a396-612e10d1df13',
        listingId: '61cfdc59-b638-49c4-8645-de6f4cfb636f',
        ownerId: 'user_1',
        userId: 'user_2',
        amount: 2500,
        isPaid: true,
        createdAt: '2025-11-07T13:14:56.112Z',
        listing: dummyListings[0],
        credential: {
            id: '3c4a950f-e25b-43c7-b592-36e76215ec2f',
            listingId: '61cfdc59-b638-49c4-8645-de6f4cfb636f',
            originalCredential: [
                { name: 'Email', type: 'email', value: 'user@example.com' },
                { name: 'Password', type: 'password', value: '12345678' },
            ],
            updatedCredential: [
                { name: 'Email', type: 'email', value: 'user@example.com' },
                { name: 'Password', type: 'password', value: '9876543210' },
            ],
            createdAt: '2025-11-07T13:13:08.881Z',
        },
    },
    {
        id: '0bd0ded3-756e-439a-8e81-2e00353cdad5',
        listingId: '339012a0-e32d-432a-be96-961ffcf27c8d',
        ownerId: 'user_1',
        userId: 'user_2',
        amount: 2500,
        isPaid: true,
        createdAt: '2025-11-10T09:00:23.832Z',
        listing: dummyListings[1],
        credential: {
            id: '14c0e94b-6a0f-4017-a277-cbb13a22f9ef',
            listingId: '339012a0-e32d-432a-be96-961ffcf27c8d',
            originalCredential: [
                { name: 'Email', type: 'email', value: 'user1@example.com' },
                { name: 'Password', type: 'password', value: '12121212' },
            ],
            updatedCredential: [
                { name: 'Email', type: 'email', value: 'user1@example.com' },
                { name: 'Password', type: 'password', value: '12345678' },
            ],
            createdAt: '2025-11-10T07:25:43.919Z',
        },
    },
];

export const dummyWithdrawalRequests = [
    {
        id: '79443d65-8dc4-447b-9d27-3a862387fa5a',
        userId: 'user_1',
        amount: 1000,
        account: [
            { name: 'Account Holder Name', type: 'text', value: 'John Doe' },
            { name: 'Bank Name', type: 'text', value: 'Bank Of America' },
            { name: 'Account Number', type: 'number', value: '112233445566' },
            { name: 'Account Type', type: 'text', value: 'Saving' },
            { name: 'SWIFT', type: 'text', value: 'AM9908TY09' },
            { name: 'Branch', type: 'text', value: 'LA' },
        ],
        isWithdrawn: true,
        createdAt: '2025-11-09T06:00:35.759Z',
        updatedAt: '2025-11-09T13:05:26.385Z',
        user: dummyUsers[0],
    },
    {
        id: 'f266e8c3-1d01-4bd3-931b-760cd766d136',
        userId: 'user_2',
        amount: 1000,
        account: [
            { name: 'Account Holder Name', type: 'text', value: 'John Doe' },
            { name: 'Bank Name', type: 'text', value: 'Bank Of America' },
            { name: 'Account Number', type: 'number', value: '112233445566' },
            { name: 'Account Type', type: 'text', value: 'Saving' },
            { name: 'SWIFT', type: 'text', value: 'AM9908TY09' },
            { name: 'Branch', type: 'text', value: 'LA' },
        ],
        isWithdrawn: true,
        createdAt: '2025-11-09T10:07:21.315Z',
        updatedAt: '2025-11-10T06:36:05.468Z',
        user: dummyUsers[1],
    },
];

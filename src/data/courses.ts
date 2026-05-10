import { Course, Achievement, CommunityPost } from '../types';

export const coursesEn: Course[] = [
  {
    id: 'en-beginner-1',
    language: 'en',
    level: 'beginner',
    title: '英语入门：从零开始',
    description: '掌握基础英语词汇和日常用语',
    icon: 'book-open',
    requiredXP: 0,
    totalLessons: 10,
    lessons: [
      {
        id: 'en-b1-lesson1',
        title: '问候语',
        type: 'vocabulary',
        content: {
          title: '日常问候',
          description: '学习基本的英语问候语',
          examples: ['Hello!', 'Good morning!', 'How are you?']
        },
        xpReward: 10,
        duration: 10,
        exercises: [
          {
            id: 'en-b1-q1',
            type: 'flashcard',
            question: 'Hello',
            correctAnswer: '你好'
          },
          {
            id: 'en-b1-q2',
            type: 'flashcard',
            question: 'Good morning',
            correctAnswer: '早上好'
          },
          {
            id: 'en-b1-q3',
            type: 'multiple-choice',
            question: '"你好" 用英语怎么说？',
            options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
            correctAnswer: 'Hello'
          }
        ]
      },
      {
        id: 'en-b1-lesson2',
        title: '数字1-10',
        type: 'vocabulary',
        content: {
          title: '数字认知',
          description: '学习基础数字的表达',
          examples: ['One, Two, Three, Four, Five']
        },
        xpReward: 10,
        duration: 8,
        exercises: [
          {
            id: 'en-b1-q4',
            type: 'flashcard',
            question: 'One',
            correctAnswer: '1'
          },
          {
            id: 'en-b1-q5',
            type: 'multiple-choice',
            question: '"5" 的英语是？',
            options: ['Three', 'Four', 'Five', 'Six'],
            correctAnswer: 'Five'
          }
        ]
      },
      {
        id: 'en-b1-lesson3',
        title: '基础语法：be动词',
        type: 'grammar',
        content: {
          title: 'Be动词的使用',
          description: '学习 am, is, are 的基本用法',
          examples: ['I am a student.', 'She is happy.', 'They are friends.']
        },
        xpReward: 15,
        duration: 15,
        exercises: [
          {
            id: 'en-b1-q6',
            type: 'fill-blank',
            question: 'I ___ a teacher.',
            correctAnswer: 'am',
            hint: '第一人称单数'
          },
          {
            id: 'en-b1-q7',
            type: 'multiple-choice',
            question: 'He ___ from China.',
            options: ['am', 'is', 'are', 'be'],
            correctAnswer: 'is'
          }
        ]
      },
      {
        id: 'en-b1-lesson4',
        title: '颜色和形状',
        type: 'vocabulary',
        content: {
          title: '颜色与形状',
          description: '认识基础颜色和几何形状',
          examples: ['Red, Blue, Circle, Square']
        },
        xpReward: 10,
        duration: 10,
        exercises: [
          {
            id: 'en-b1-q8',
            type: 'flashcard',
            question: 'Red',
            correctAnswer: '红色'
          },
          {
            id: 'en-b1-q9',
            type: 'multiple-choice',
            question: 'Circle 是什么意思？',
            options: ['方形', '圆形', '三角形', '长方形'],
            correctAnswer: '圆形'
          }
        ]
      },
      {
        id: 'en-b1-lesson5',
        title: '日常对话',
        type: 'speaking',
        content: {
          title: '日常对话练习',
          description: '练习日常问候对话',
          text: 'Hello! How are you? I am fine, thank you.'
        },
        xpReward: 15,
        duration: 12,
        exercises: []
      },
      {
        id: 'en-b1-lesson6',
        title: '听力入门',
        type: 'listening',
        content: {
          title: '基础听力',
          description: 'Listen to the conversation and answer questions.',
          text: 'A: Hello! B: Hi! How are you today? A: I am good, thank you. And you? B: I am fine too.'
        },
        xpReward: 15,
        duration: 12,
        exercises: []
      }
    ]
  },
  {
    id: 'en-intermediate-1',
    language: 'en',
    level: 'intermediate',
    title: '中级英语：提升表达',
    description: '扩展词汇量，学习复杂句型',
    icon: 'book',
    requiredXP: 500,
    totalLessons: 15,
    lessons: [
      {
        id: 'en-i1-lesson1',
        title: '现在完成时',
        type: 'grammar',
        content: {
          title: '现在完成时态',
          description: '学习 have/has + past participle',
          examples: ['I have finished my homework.', 'She has lived here for 5 years.']
        },
        xpReward: 20,
        duration: 20,
        exercises: [
          {
            id: 'en-i1-q1',
            type: 'fill-blank',
            question: 'I ___ (see) that movie twice.',
            correctAnswer: 'have seen',
            hint: '注意现在完成时的结构'
          },
          {
            id: 'en-i1-q2',
            type: 'multiple-choice',
            question: 'She ___ (live) in Paris since 2010.',
            options: ['has lived', 'have lived', 'is living', 'lived'],
            correctAnswer: 'has lived'
          }
        ]
      },
      {
        id: 'en-i1-lesson2',
        title: '商业英语',
        type: 'vocabulary',
        content: {
          title: '职场词汇',
          description: '学习常用的商务英语表达',
          examples: ['meeting, deadline, proposal, client']
        },
        xpReward: 15,
        duration: 15,
        exercises: [
          {
            id: 'en-i1-q3',
            type: 'flashcard',
            question: 'deadline',
            correctAnswer: '截止日期'
          },
          {
            id: 'en-i1-q4',
            type: 'multiple-choice',
            question: '"proposal" 在商务中指？',
            options: ['会议', '提案', '报告', '邮件'],
            correctAnswer: '提案'
          }
        ]
      }
    ]
  },
  {
    id: 'en-advanced-1',
    language: 'en',
    level: 'advanced',
    title: '高级英语：流畅沟通',
    description: '掌握高级语法和地道表达',
    icon: 'graduation-cap',
    requiredXP: 1500,
    totalLessons: 20,
    lessons: [
      {
        id: 'en-a1-lesson1',
        title: '虚拟语气',
        type: 'grammar',
        content: {
          title: '虚拟语气',
          description: '学习与现在/过去事实相反的假设',
          examples: ['If I were you, I would go.', 'I wish I had more time.']
        },
        xpReward: 25,
        duration: 25,
        exercises: [
          {
            id: 'en-a1-q1',
            type: 'fill-blank',
            question: 'If I ___ (be) rich, I would travel the world.',
            correctAnswer: 'were',
            hint: '与现在事实相反'
          }
        ]
      }
    ]
  }
];

export const coursesJa: Course[] = [
  {
    id: 'ja-beginner-1',
    language: 'ja',
    level: 'beginner',
    title: '日语入门：五十音图',
    description: '学习日语假名，打好基础',
    icon: 'book-open',
    requiredXP: 0,
    totalLessons: 10,
    lessons: [
      {
        id: 'ja-b1-lesson1',
        title: 'あ行',
        type: 'vocabulary',
        content: {
          title: 'あ行假名',
          description: '学习あ行的五个假名',
          examples: ['あいうえお']
        },
        xpReward: 10,
        duration: 10,
        exercises: [
          {
            id: 'ja-b1-q1',
            type: 'flashcard',
            question: 'あ',
            correctAnswer: 'a'
          },
          {
            id: 'ja-b1-q2',
            type: 'flashcard',
            question: 'い',
            correctAnswer: 'i'
          },
          {
            id: 'ja-b1-q3',
            type: 'multiple-choice',
            question: '"う" 的发音是？',
            options: ['a', 'i', 'u', 'e'],
            correctAnswer: 'u'
          }
        ]
      },
      {
        id: 'ja-b1-lesson2',
        title: 'か行',
        type: 'vocabulary',
        content: {
          title: 'か行假名',
          description: '学习か行的五个假名',
          examples: ['かきくけこ']
        },
        xpReward: 10,
        duration: 10,
        exercises: [
          {
            id: 'ja-b1-q4',
            type: 'flashcard',
            question: 'か',
            correctAnswer: 'ka'
          },
          {
            id: 'ja-b1-q5',
            type: 'multiple-choice',
            question: '"け" 属于哪一行？',
            options: ['あ行', 'か行', 'さ行', 'た行'],
            correctAnswer: 'か行'
          }
        ]
      },
      {
        id: 'ja-b1-lesson3',
        title: '基本问候',
        type: 'vocabulary',
        content: {
          title: '日常问候语',
          description: '学习最基础的日语问候',
          examples: ['こんにちは (konnichiwa)', 'おはよう (ohayou)']
        },
        xpReward: 10,
        duration: 8,
        exercises: [
          {
            id: 'ja-b1-q6',
            type: 'flashcard',
            question: 'こんにちは',
            correctAnswer: '你好'
          },
          {
            id: 'ja-b1-q7',
            type: 'multiple-choice',
            question: '"おはよう" 是什么意思？',
            options: ['你好', '早上好', '晚安', '再见'],
            correctAnswer: '早上好'
          }
        ]
      },
      {
        id: 'ja-b1-lesson4',
        title: '日常会话',
        type: 'speaking',
        content: {
          title: '日常会话练习',
          description: '练习日语日常对话',
          text: 'こんにちは！元気ですか？はい、元気です。ありがとう。'
        },
        xpReward: 15,
        duration: 12,
        exercises: []
      },
      {
        id: 'ja-b1-lesson5',
        title: '听力入门',
        type: 'listening',
        content: {
          title: '基礎リスニング',
          description: 'Listen to the Japanese conversation.',
          text: 'A: こんにちは！ B: こんにちは！元気ですか？ A: はい、元気です。あなたは？ B: 私も元気です。'
        },
        xpReward: 15,
        duration: 12,
        exercises: []
      }
    ]
  },
  {
    id: 'ja-intermediate-1',
    language: 'ja',
    level: 'intermediate',
    title: '中级日语：日常交流',
    description: '提升口语能力，进行简单对话',
    icon: 'book',
    requiredXP: 500,
    totalLessons: 15,
    lessons: [
      {
        id: 'ja-i1-lesson1',
        title: '动词变形',
        type: 'grammar',
        content: {
          title: '动词て形',
          description: '学习动词的て形变化',
          examples: ['食べる→食べて', '行く→行って']
        },
        xpReward: 20,
        duration: 20,
        exercises: [
          {
            id: 'ja-i1-q1',
            type: 'fill-blank',
            question: '見る → ___ (て形)',
            correctAnswer: '見て',
            hint: '一段动词的て形'
          }
        ]
      },
      {
        id: 'ja-i1-lesson2',
        title: '餐厅用语',
        type: 'vocabulary',
        content: {
          title: '餐饮场景词汇',
          description: '学习在餐厅常用的表达',
          examples: ['メニュー (menu)', '注文 (order)']
        },
        xpReward: 15,
        duration: 15,
        exercises: [
          {
            id: 'ja-i1-q3',
            type: 'flashcard',
            question: 'メニュー',
            correctAnswer: '菜单'
          }
        ]
      }
    ]
  },
  {
    id: 'ja-advanced-1',
    language: 'ja',
    level: 'advanced',
    title: '高级日语：商务日语',
    description: '掌握商务场景的专业表达',
    icon: 'graduation-cap',
    requiredXP: 1500,
    totalLessons: 20,
    lessons: [
      {
        id: 'ja-a1-lesson1',
        title: '商务邮件',
        type: 'grammar',
        content: {
          title: '商务邮件格式',
          description: '学习正式的商务邮件写法',
          examples: ['お世話になっております', 'ご返信ください']
        },
        xpReward: 25,
        duration: 25,
        exercises: [
          {
            id: 'ja-a1-q1',
            type: 'multiple-choice',
            question: '商务邮件开头常用语是？',
            options: ['こんにちは', 'お世話になっております', 'さようなら', 'ありがとう'],
            correctAnswer: 'お世話になっております'
          }
        ]
      }
    ]
  }
];

export const coursesKo: Course[] = [
  {
    id: 'ko-beginner-1',
    language: 'ko',
    level: 'beginner',
    title: '韩语入门：韩文字母',
    description: '学习韩文字母表和基础发音',
    icon: 'book-open',
    requiredXP: 0,
    totalLessons: 10,
    lessons: [
      {
        id: 'ko-b1-lesson1',
        title: '基本子音',
        type: 'vocabulary',
        content: {
          title: '韩语基本子音',
          description: '学习14个基本子音',
          examples: ['ㄱ, ㄴ, ㄷ, ㄹ, ㅁ']
        },
        xpReward: 10,
        duration: 10,
        exercises: [
          {
            id: 'ko-b1-q1',
            type: 'flashcard',
            question: 'ㄱ',
            correctAnswer: 'g/k'
          },
          {
            id: 'ko-b1-q2',
            type: 'flashcard',
            question: 'ㄴ',
            correctAnswer: 'n'
          },
          {
            id: 'ko-b1-q3',
            type: 'multiple-choice',
            question: '"ㅁ" 的发音是？',
            options: ['m', 'n', 's', 'l'],
            correctAnswer: 'm'
          }
        ]
      },
      {
        id: 'ko-b1-lesson2',
        title: '基本母音',
        type: 'vocabulary',
        content: {
          title: '韩语基本母音',
          description: '学习10个基本母音',
          examples: ['ㅏ, ㅑ, ㅓ, ㅕ, ㅜ']
        },
        xpReward: 10,
        duration: 10,
        exercises: [
          {
            id: 'ko-b1-q4',
            type: 'flashcard',
            question: 'ㅏ',
            correctAnswer: 'a'
          },
          {
            id: 'ko-b1-q5',
            type: 'multiple-choice',
            question: '"ㅜ" 的发音是？',
            options: ['a', 'e', 'u', 'o'],
            correctAnswer: 'u'
          }
        ]
      },
      {
        id: 'ko-b1-lesson3',
        title: '日常问候',
        type: 'vocabulary',
        content: {
          title: '韩语基本问候',
          description: '学习基础的韩语问候语',
          examples: ['안녕하세요 (annyeonghaseyo)', '감사합니다 (gamsahamnida)']
        },
        xpReward: 10,
        duration: 8,
        exercises: [
          {
            id: 'ko-b1-q6',
            type: 'flashcard',
            question: '안녕하세요',
            correctAnswer: '你好'
          },
          {
            id: 'ko-b1-q7',
            type: 'multiple-choice',
            question: '"감사합니다" 是什么意思？',
            options: ['你好', '谢谢', '再见', '对不起'],
            correctAnswer: '谢谢'
          }
        ]
      },
      {
        id: 'ko-b1-lesson4',
        title: '日常对话',
        type: 'speaking',
        content: {
          title: '일상 대화 연습',
          description: '练习韩语日常对话',
          text: '안녕하세요! 잘 지냈어요? 네, 잘 지냈어요. 감사합니다.'
        },
        xpReward: 15,
        duration: 12,
        exercises: []
      },
      {
        id: 'ko-b1-lesson5',
        title: '听力入门',
        type: 'listening',
        content: {
          title: '기초 듣기',
          description: 'Listen to the Korean conversation.',
          text: 'A: 안녕하세요! B: 안녕하세요! 잘 지냈어요? A: 네, 잘 지냈어요. 당신은요? B: 저도 잘 지냈어요.'
        },
        xpReward: 15,
        duration: 12,
        exercises: []
      }
    ]
  },
  {
    id: 'ko-intermediate-1',
    language: 'ko',
    level: 'intermediate',
    title: '中级韩语：日常生活',
    description: '掌握日常对话所需词汇',
    icon: 'book',
    requiredXP: 500,
    totalLessons: 15,
    lessons: [
      {
        id: 'ko-i1-lesson1',
        title: '动词变化',
        type: 'grammar',
        content: {
          title: '韩语动词아요/어요/여요变化',
          description: '学习动词的非正式尊敬形',
          examples: ['가다 → 가요', '하다 → 해요']
        },
        xpReward: 20,
        duration: 20,
        exercises: [
          {
            id: 'ko-i1-q1',
            type: 'fill-blank',
            question: '먹다 → ___ (어요形)',
            correctAnswer: '먹어요',
            hint: '以다结尾，ㅂ不规则动词'
          }
        ]
      },
      {
        id: 'ko-i1-lesson2',
        title: '购物用语',
        type: 'vocabulary',
        content: {
          title: '购物场景词汇',
          description: '学习在商店常用的表达',
          examples: ['얼마예요? (多少钱?)', '싸요 (便宜)']
        },
        xpReward: 15,
        duration: 15,
        exercises: [
          {
            id: 'ko-i1-q3',
            type: 'flashcard',
            question: '얼마예요?',
            correctAnswer: '多少钱?'
          }
        ]
      }
    ]
  },
  {
    id: 'ko-advanced-1',
    language: 'ko',
    level: 'advanced',
    title: '高级韩语：商务韩语',
    description: '学习职场和商务场景用语',
    icon: 'graduation-cap',
    requiredXP: 1500,
    totalLessons: 20,
    lessons: [
      {
        id: 'ko-a1-lesson1',
        title: '商务礼仪',
        type: 'grammar',
        content: {
          title: '韩国商务礼仪',
          description: '学习商务场合的正确表达',
          examples: ['인사드리겠습니다', '늦게 와서 죄송합니다']
        },
        xpReward: 25,
        duration: 25,
        exercises: [
          {
            id: 'ko-a1-q1',
            type: 'multiple-choice',
            question: '初次见面时应该说？',
            options: ['안녕하세요', '인사드리겠습니다', '잘 가세요', '미안합니다'],
            correctAnswer: '인사드리겠습니다'
          }
        ]
      }
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: '第一步',
    description: '完成你的第一节课',
    icon: 'footprints',
    requirement: 1,
    xpReward: 50,
    category: 'vocabulary'
  },
  {
    id: 'vocab-master-50',
    title: '词汇达人50',
    description: '学习50个新单词',
    icon: 'book',
    requirement: 50,
    xpReward: 100,
    category: 'vocabulary'
  },
  {
    id: 'vocab-master-100',
    title: '词汇大师100',
    description: '学习100个新单词',
    icon: 'book-open',
    requirement: 100,
    xpReward: 200,
    category: 'vocabulary'
  },
  {
    id: 'streak-3',
    title: '初学者',
    description: '连续学习3天',
    icon: 'flame',
    requirement: 3,
    xpReward: 75,
    category: 'streak'
  },
  {
    id: 'streak-7',
    title: '坚持一周',
    description: '连续学习7天',
    icon: 'flame',
    requirement: 7,
    xpReward: 150,
    category: 'streak'
  },
  {
    id: 'streak-30',
    title: '月度学习者',
    description: '连续学习30天',
    icon: 'trophy',
    requirement: 30,
    xpReward: 500,
    category: 'streak'
  },
  {
    id: 'grammar-beginner',
    title: '语法入门',
    description: '完成10个语法练习',
    icon: 'file-text',
    requirement: 10,
    xpReward: 100,
    category: 'grammar'
  },
  {
    id: 'speaking-first',
    title: '开口说',
    description: '完成第一次口语练习',
    icon: 'mic',
    requirement: 1,
    xpReward: 50,
    category: 'speaking'
  },
  {
    id: 'listening-first',
    title: '竖起耳朵',
    description: '完成第一次听力训练',
    icon: 'headphones',
    requirement: 1,
    xpReward: 50,
    category: 'listening'
  },
  {
    id: 'social-butterfly',
    title: '社交达人',
    description: '在社区发布3篇帖子',
    icon: 'users',
    requirement: 3,
    xpReward: 100,
    category: 'social'
  },
  {
    id: 'xp-1000',
    title: '千禧新星',
    description: '累计获得1000 XP',
    icon: 'star',
    requirement: 1000,
    xpReward: 200,
    category: 'vocabulary'
  },
  {
    id: 'xp-5000',
    title: '学习明星',
    description: '累计获得5000 XP',
    icon: 'crown',
    requirement: 5000,
    xpReward: 500,
    category: 'vocabulary'
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    authorName: '英语爱好者',
    authorAvatar: '👤',
    language: 'en',
    title: '分享我的英语学习技巧',
    content: '学习英语最重要的是坚持每天听力和阅读输入。我每天会用30分钟听BBC新闻，再花30分钟阅读英文文章。推荐给大家！',
    likes: 128,
    comments: 32,
    createdAt: '2026-05-08',
    tags: ['英语', '学习方法', '听力', '阅读']
  },
  {
    id: 'post-2',
    authorId: 'user-2',
    authorName: '日语学习者',
    authorAvatar: '👤',
    language: 'ja',
    title: 'JLPT N2备考经验分享',
    content: '备考N2需要扎实的基础。我建议先从词汇和语法入手，然后多做真题练习。听力部分建议每天听NHK新闻。',
    likes: 256,
    comments: 48,
    createdAt: '2026-05-07',
    tags: ['日语', 'JLPT', 'N2', '备考']
  },
  {
    id: 'post-3',
    authorId: 'user-3',
    authorName: '韩语达人',
    authorAvatar: '👤',
    language: 'ko',
    title: '看韩剧学韩语真的有效吗？',
    content: '答案是肯定的！我通过看韩剧学习了很多日常用语和流行词汇。建议开双语字幕，先看一遍中文字幕理解剧情，再看韩文字幕学习表达。',
    likes: 189,
    comments: 56,
    createdAt: '2026-05-06',
    tags: ['韩语', '学习方法', '韩剧']
  },
  {
    id: 'post-4',
    authorId: 'user-4',
    authorName: '口语练习家',
    authorAvatar: '👤',
    language: 'en',
    title: '如何克服英语口语恐惧',
    content: '很多人害怕说英语出错，其实这是正常的。我的方法是先自言自语练习，然后找语言交换伙伴，慢慢建立信心。',
    likes: 342,
    comments: 89,
    createdAt: '2026-05-05',
    tags: ['英语', '口语', '学习方法', '心理建设']
  }
];

export const defaultUserData = {
  id: 'guest',
  email: '',
  nickname: '游客',
  avatar: '👤',
  role: 'guest' as const,
  languages: [],
  totalXP: 0,
  streak: 0,
  achievements: [],
  createdAt: new Date().toISOString(),
  lastStudyDate: ''
};

export function getAllCourses() {
  return [...coursesEn, ...coursesJa, ...coursesKo];
}

export function getCourseByLanguage(language: 'en' | 'ja' | 'ko') {
  const all = getAllCourses();
  return all.filter(c => c.language === language);
}

export function getCourseById(courseId: string) {
  const all = getAllCourses();
  return all.find(c => c.id === courseId);
}
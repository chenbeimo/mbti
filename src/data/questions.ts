export interface Option {
  text: string
  emoji?: string
  scores: Partial<Record<'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P', number>>
  hiddenScores?: Partial<Record<'O' | 'A' | 'C' | 'H', number>>
}

export interface Question {
  id: number
  text: string
  type: 'classic' | 'quirky'
  dimension?: 'EI' | 'SN' | 'TF' | 'JP'
  tag?: string
  options: Option[]
}

export const questions: Question[] = [
  // ========== E/I 维度 (7题) ==========
  {
    id: 1,
    text: '周末到了，你更想怎么度过？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '约上朋友出去浪', emoji: '🎉', scores: { E: 3 } },
      { text: '在家追剧/打游戏', emoji: '🏠', scores: { I: 3 } },
    ],
  },
  {
    id: 2,
    text: '参加一个大型聚会，你会？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '主动认识新朋友，越聊越嗨', emoji: '🗣️', scores: { E: 3 } },
      { text: '找个角落和熟悉的人待着', emoji: '🫣', scores: { I: 3 } },
    ],
  },
  {
    id: 3,
    text: '工作/学习一天后，你需要怎么充电？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '和朋友吃饭聊天释放压力', emoji: '🍻', scores: { E: 3 } },
      { text: '一个人安静待着恢复能量', emoji: '🛁', scores: { I: 3 } },
    ],
  },
  {
    id: 4,
    text: '你在团队中通常扮演什么角色？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '活跃气氛的开心果', emoji: '😄', scores: { E: 3 } },
      { text: '默默做事的靠谱人', emoji: '🔧', scores: { I: 3 } },
    ],
  },
  {
    id: 5,
    text: '遇到有趣的事情，你第一反应是？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '立刻分享给身边的人', emoji: '📢', scores: { E: 3 } },
      { text: '先自己消化一下再说', emoji: '🤔', scores: { I: 3 } },
    ],
  },
  {
    id: 6,
    text: '你更喜欢哪种社交方式？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '面对面聊天，越热闹越好', emoji: '👋', scores: { E: 3 } },
      { text: '线上文字交流，节奏自己掌控', emoji: '💬', scores: { I: 3 } },
    ],
  },
  {
    id: 7,
    text: '如果要演讲/展示，你会？',
    type: 'classic',
    dimension: 'EI',
    options: [
      { text: '兴奋！终于可以表现了', emoji: '🎤', scores: { E: 3 } },
      { text: '紧张...能不上吗', emoji: '😰', scores: { I: 3 } },
    ],
  },

  // ========== S/N 维度 (7题) ==========
  {
    id: 8,
    text: '你更关注什么？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '眼前具体的事实和细节', emoji: '📋', scores: { S: 3 } },
      { text: '未来的可能性和想象', emoji: '✨', scores: { N: 3 } },
    ],
  },
  {
    id: 9,
    text: '学习新东西时，你更喜欢？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '按步骤一步步来', emoji: '📖', scores: { S: 3 } },
      { text: '先了解整体框架再深入', emoji: '🗺️', scores: { N: 3 } },
    ],
  },
  {
    id: 10,
    text: '别人描述你时，哪个词更贴切？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '务实、脚踏实地', emoji: '🏗️', scores: { S: 3 } },
      { text: '有想象力、天马行空', emoji: '🌈', scores: { N: 3 } },
    ],
  },
  {
    id: 11,
    text: '你更信任什么？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '亲身经历和实际数据', emoji: '📊', scores: { S: 3 } },
      { text: '直觉和第六感', emoji: '🔮', scores: { N: 3 } },
    ],
  },
  {
    id: 12,
    text: '描述一个苹果，你会说？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '红色的、圆的、脆甜的', emoji: '🍎', scores: { S: 3 } },
      { text: '像牛顿的灵感、像白雪公主的诱惑', emoji: '💡', scores: { N: 3 } },
    ],
  },
  {
    id: 13,
    text: '做计划时你更看重？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '具体可执行的步骤', emoji: '✅', scores: { S: 3 } },
      { text: '大方向和愿景', emoji: '🎯', scores: { N: 3 } },
    ],
  },
  {
    id: 14,
    text: '你觉得哪种说法更像你？',
    type: 'classic',
    dimension: 'SN',
    options: [
      { text: '我是一个注重细节的人', emoji: '🔍', scores: { S: 3 } },
      { text: '我是一个喜欢创新的人', emoji: '🚀', scores: { N: 3 } },
    ],
  },

  // ========== T/F 维度 (7题) ==========
  {
    id: 15,
    text: '朋友向你倾诉烦恼，你更倾向于？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '帮他分析问题，给出解决方案', emoji: '🧩', scores: { T: 3 } },
      { text: '先共情安慰，让他感受到支持', emoji: '🤗', scores: { F: 3 } },
    ],
  },
  {
    id: 16,
    text: '做决定时，你更看重？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '逻辑分析和客观事实', emoji: '⚖️', scores: { T: 3 } },
      { text: '个人价值观和他人感受', emoji: '❤️', scores: { F: 3 } },
    ],
  },
  {
    id: 17,
    text: '团队有分歧时，你会？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '指出逻辑漏洞，据理力争', emoji: '⚔️', scores: { T: 3 } },
      { text: '考虑各方感受，寻求和谐', emoji: '🕊️', scores: { F: 3 } },
    ],
  },
  {
    id: 18,
    text: '你觉得"公正"意味着什么？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '对所有人一视同仁，按规则办事', emoji: '📏', scores: { T: 3 } },
      { text: '考虑每个人的具体情况和感受', emoji: '🤲', scores: { F: 3 } },
    ],
  },
  {
    id: 19,
    text: '看一部感人的电影，你会？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '觉得剧情有漏洞，不太能入戏', emoji: '🧐', scores: { T: 3 } },
      { text: '哭得稀里哗啦，完全代入', emoji: '😭', scores: { F: 3 } },
    ],
  },
  {
    id: 20,
    text: '别人批评你时，你更在意？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '批评是否合理、有道理', emoji: '📝', scores: { T: 3 } },
      { text: '批评的方式是否伤害了我', emoji: '💔', scores: { F: 3 } },
    ],
  },
  {
    id: 21,
    text: '你更欣赏哪种品质？',
    type: 'classic',
    dimension: 'TF',
    options: [
      { text: '理性、客观、有逻辑', emoji: '🧠', scores: { T: 3 } },
      { text: '温暖、善良、有同理心', emoji: '🌻', scores: { F: 3 } },
    ],
  },

  // ========== J/P 维度 (7题) ==========
  {
    id: 22,
    text: '你的桌面/房间通常是？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '整洁有序，东西都有固定位置', emoji: '🗂️', scores: { J: 3 } },
      { text: '有创意的混乱，我知道东西在哪', emoji: '🎨', scores: { P: 3 } },
    ],
  },
  {
    id: 23,
    text: '出门旅行前，你会？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '提前做好详细攻略', emoji: '📑', scores: { J: 3 } },
      { text: '到了再说，随遇而安', emoji: '🎒', scores: { P: 3 } },
    ],
  },
  {
    id: 24,
    text: 'deadline 临近，你会？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '早就完成了，提前交', emoji: '⏰', scores: { J: 3 } },
      { text: '最后一刻灵感爆发', emoji: '⚡', scores: { P: 3 } },
    ],
  },
  {
    id: 25,
    text: '你更喜欢哪种生活方式？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '有计划、有规律', emoji: '📅', scores: { J: 3 } },
      { text: '灵活、随性、自由', emoji: '🌊', scores: { P: 3 } },
    ],
  },
  {
    id: 26,
    text: '突然改变计划，你会？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '感到焦虑和不安', emoji: '😤', scores: { J: 3 } },
      { text: '无所谓，甚至有点兴奋', emoji: '🎢', scores: { P: 3 } },
    ],
  },
  {
    id: 27,
    text: '购物时你更倾向于？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '列好清单，目标明确', emoji: '🛒', scores: { J: 3 } },
      { text: '逛到什么喜欢就买什么', emoji: '🛍️', scores: { P: 3 } },
    ],
  },
  {
    id: 28,
    text: '你做事的风格是？',
    type: 'classic',
    dimension: 'JP',
    options: [
      { text: '有条不紊，按部就班', emoji: '📋', scores: { J: 3 } },
      { text: '随机应变，灵活变通', emoji: '🤹', scores: { P: 3 } },
    ],
  },

  // ========== 猎奇题 (12题) ==========
  {
    id: 29,
    text: '丧尸围城，你的第一反应是？',
    type: 'quirky',
    tag: '🧠 末日生存',
    options: [
      { text: '立刻整理物资清单，制定撤离路线', emoji: '📋', scores: { S: 2, J: 2 }, hiddenScores: { A: 2 } },
      { text: '冲出去组队，人多力量大', emoji: '🏃', scores: { E: 2, P: 2 }, hiddenScores: { H: 2 } },
      { text: '找个安全的地方先观察局势', emoji: '🔭', scores: { I: 2, N: 2 }, hiddenScores: { C: 2 } },
      { text: '研究丧尸的弱点，找到克制方法', emoji: '🧪', scores: { N: 2, T: 2 }, hiddenScores: { O: 2 } },
    ],
  },
  {
    id: 30,
    text: '转生异世界，你选择成为？',
    type: 'quirky',
    tag: '🌀 异世界转生',
    options: [
      { text: '图书馆管理员，安静地掌握所有知识', emoji: '📚', scores: { I: 2, N: 2 }, hiddenScores: { C: 2 } },
      { text: '冒险者公会会长，统领全局', emoji: '⚔️', scores: { E: 2, J: 2 }, hiddenScores: { A: 2 } },
      { text: '流浪商人，到处收集稀有物品', emoji: '🧳', scores: { P: 2, S: 2 }, hiddenScores: { H: 2 } },
      { text: '神秘预言师，洞察未来的走向', emoji: '🔮', scores: { N: 2, F: 2 }, hiddenScores: { O: 2 } },
    ],
  },
  {
    id: 31,
    text: '你的机械义肢突然故障，你会？',
    type: 'quirky',
    tag: '🤖 赛博朋克',
    options: [
      { text: '翻出说明书逐条排查', emoji: '📖', scores: { S: 2, T: 2 }, hiddenScores: { A: 2 } },
      { text: '凭感觉拍两下，大力出奇迹', emoji: '👊', scores: { P: 2, N: 2 }, hiddenScores: { H: 2 } },
      { text: '上网搜索同类问题的解决方案', emoji: '🔍', scores: { S: 2, I: 2 }, hiddenScores: { C: 2 } },
      { text: '趁机改装成更酷的版本', emoji: '⚡', scores: { N: 2, P: 2 }, hiddenScores: { O: 2 } },
    ],
  },
  {
    id: 32,
    text: '火锅里有人下了香菜，你的真实想法是？',
    type: 'quirky',
    tag: '🌿 美食审判',
    options: [
      { text: '愤怒！这是对火锅的亵渎！', emoji: '😡', scores: { F: 2, J: 2 }, hiddenScores: { O: 2 } },
      { text: '无所谓，挑出来就行', emoji: '😌', scores: { T: 2, P: 2 }, hiddenScores: { A: 2 } },
      { text: '其实...我觉得还挺香的', emoji: '😋', scores: { F: 2, P: 2 }, hiddenScores: { H: 2 } },
      { text: '分析一下香菜在火锅中的化学反应', emoji: '🔬', scores: { T: 2, N: 2 }, hiddenScores: { C: 2 } },
    ],
  },
  {
    id: 33,
    text: '你进入一条"不能回头的走廊"，听到身后有声音，你会？',
    type: 'quirky',
    tag: '👻 规则怪谈',
    options: [
      { text: '加快脚步，严格遵守规则', emoji: '🚶', scores: { J: 2, S: 2 }, hiddenScores: { A: 2 } },
      { text: '回头看看，好奇心大于恐惧', emoji: '👀', scores: { P: 2, N: 2 }, hiddenScores: { O: 2 } },
      { text: '冷静分析声音来源，制定应对方案', emoji: '🧠', scores: { T: 2, I: 2 }, hiddenScores: { C: 2 } },
      { text: '大声喊一句"谁在那？"', emoji: '📢', scores: { E: 2, F: 2 }, hiddenScores: { H: 2 } },
    ],
  },
  {
    id: 34,
    text: '微信群有人发 60 秒语音方阵，你的血压变化是？',
    type: 'quirky',
    tag: '📱 社交地狱',
    options: [
      { text: '血压飙升，直接文字回复"请打字"', emoji: '😤', scores: { T: 2, J: 2 }, hiddenScores: { A: 2 } },
      { text: '默默转文字，能看就行', emoji: '📝', scores: { I: 2, S: 2 }, hiddenScores: { C: 2 } },
      { text: '耐心听完，觉得对方挺可爱的', emoji: '🥰', scores: { F: 2, E: 2 }, hiddenScores: { H: 2 } },
      { text: '录一段更长的语音怼回去', emoji: '🎤', scores: { E: 2, P: 2 }, hiddenScores: { O: 2 } },
    ],
  },
  {
    id: 35,
    text: '你获得了一个超能力，但只能选一个？',
    type: 'quirky',
    tag: '💥 超能力选择',
    options: [
      { text: '读心术——知道别人在想什么', emoji: '🧠', scores: { N: 2, T: 2 }, hiddenScores: { O: 2 } },
      { text: '时间暂停——给自己更多时间', emoji: '⏸️', scores: { I: 2, J: 2 }, hiddenScores: { A: 2 } },
      { text: '瞬间移动——想去哪就去哪', emoji: '⚡', scores: { E: 2, P: 2 }, hiddenScores: { H: 2 } },
      { text: '预知未来——提前知道会发生什么', emoji: '🔮', scores: { N: 2, F: 2 }, hiddenScores: { C: 2 } },
    ],
  },
  {
    id: 36,
    text: '你被困在电梯里 2 小时，会怎么度过？',
    type: 'quirky',
    tag: '🛗 密室困境',
    options: [
      { text: '按紧急按钮、打电话求救，积极自救', emoji: '🆘', scores: { E: 2, T: 2 }, hiddenScores: { A: 2 } },
      { text: '安静等待，反正急也没用', emoji: '😌', scores: { I: 2, P: 2 }, hiddenScores: { C: 2 } },
      { text: '和同困的人聊天，化危机为社交', emoji: '💬', scores: { E: 2, F: 2 }, hiddenScores: { H: 2 } },
      { text: '研究电梯结构，寻找自救可能', emoji: '🔧', scores: { S: 2, N: 2 }, hiddenScores: { O: 2 } },
    ],
  },
  {
    id: 37,
    text: '如果世界末日只能带三样东西，你选？',
    type: 'quirky',
    tag: '🎒 末日行囊',
    options: [
      { text: '工具箱、急救包、打火机', emoji: '🧰', scores: { S: 2, T: 2 }, hiddenScores: { A: 2 } },
      { text: '日记本、照片、一把吉他', emoji: '🎸', scores: { F: 2, I: 2 }, hiddenScores: { H: 2 } },
      { text: '种子、百科全书、太阳能板', emoji: '🌱', scores: { N: 2, J: 2 }, hiddenScores: { C: 2 } },
      { text: '手机、充电宝、一副扑克牌', emoji: '📱', scores: { P: 2, E: 2 }, hiddenScores: { O: 2 } },
    ],
  },
  {
    id: 38,
    text: '你发现同事在背后说你坏话，你会？',
    type: 'quirky',
    tag: '😾 职场暗战',
    options: [
      { text: '直接当面问清楚，有话直说', emoji: '⚔️', scores: { T: 2, E: 2 }, hiddenScores: { A: 2 } },
      { text: '假装不知道，但心里记住了', emoji: '📝', scores: { I: 2, J: 2 }, hiddenScores: { C: 2 } },
      { text: '反思自己是不是哪里做得不好', emoji: '🤔', scores: { F: 2, I: 2 }, hiddenScores: { O: 2 } },
      { text: '找个机会用实力证明自己', emoji: '💪', scores: { T: 2, P: 2 }, hiddenScores: { H: 2 } },
    ],
  },
  {
    id: 39,
    text: '你中了 500 万彩票，第一反应是？',
    type: 'quirky',
    tag: '💰 天降横财',
    options: [
      { text: '列一个详细的理财计划', emoji: '📊', scores: { J: 2, S: 2 }, hiddenScores: { A: 2 } },
      { text: '先请所有朋友吃顿大的', emoji: '🎉', scores: { E: 2, F: 2 }, hiddenScores: { H: 2 } },
      { text: '辞职！环游世界！', emoji: '✈️', scores: { P: 2, N: 2 }, hiddenScores: { O: 2 } },
      { text: '存起来，生活照旧，低调行事', emoji: '🏦', scores: { I: 2, T: 2 }, hiddenScores: { C: 2 } },
    ],
  },
  {
    id: 40,
    text: '最后一个问题：你觉得这个测试准吗？',
    type: 'quirky',
    tag: '🎯 灵魂拷问',
    options: [
      { text: '挺准的，分析到位', emoji: '👍', scores: { F: 2 }, hiddenScores: { H: 2 } },
      { text: '一般般，有些题太简单了', emoji: '🤔', scores: { T: 2 }, hiddenScores: { C: 2 } },
      { text: '不准！但很好玩', emoji: '😂', scores: { E: 2, P: 2 }, hiddenScores: { O: 2 } },
      { text: '我需要看到完整报告才能判断', emoji: '📋', scores: { J: 2, S: 2 }, hiddenScores: { A: 2 } },
    ],
  },
]

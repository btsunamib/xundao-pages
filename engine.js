(function (root) {
  'use strict';
  const FORMAT = 'xundao-single-v1';
  const VERSION = 1;
  const SLOTS = [
    {id:'weapon',name:'法器',icon:'sword'}, {id:'crown',name:'冠冕',icon:'crown'},
    {id:'robe',name:'道袍',icon:'robe'}, {id:'necklace',name:'项链',icon:'necklace'},
    {id:'ring',name:'戒指',icon:'ring'}, {id:'bracelet',name:'手镯',icon:'bracelet'},
    {id:'belt',name:'腰带',icon:'belt'}, {id:'boots',name:'靴履',icon:'boots'}
  ];
  const QUALITIES = [
    {name:'凡品',color:'#7d877a',factor:1}, {name:'良品',color:'#489269',factor:1.35},
    {name:'上品',color:'#3a8fac',factor:1.9}, {name:'珍品',color:'#9873b1',factor:2.65},
    {name:'极品',color:'#c29538',factor:3.7}, {name:'仙品',color:'#d06d88',factor:5},
    {name:'神品',color:'#bf5a35',factor:6.6}
  ];
  const TRAITS = {combo:'连击',crit:'暴击',counter:'反击',lifesteal:'吸血',dodge:'闪避',stun:'击晕'};
  const REALMS = ['炼气','筑基','结丹','金丹','元婴','化神','炼虚','合体','大乘','渡劫'];
  const PETS = [
    {id:'fox',name:'灵狐',quality:1,icon:'fox',weight:32,skill:'青木回春',description:'每 3 回合回复自身 12% 生命。',interval:3,type:'heal',factor:.12},
    {id:'bird',name:'青鸾',quality:2,icon:'bird',weight:25,skill:'青羽流光',description:'每 3 回合造成 120% 攻击伤害。',interval:3,type:'attack',factor:1.2},
    {id:'tiger',name:'山君',quality:2,icon:'tiger',weight:20,skill:'虎啸山林',description:'每 2 回合造成 90% 攻击伤害。',interval:2,type:'attack',factor:.9},
    {id:'bai',name:'白泽',quality:3,icon:'bai',weight:12,skill:'泽被万物',description:'每 3 回合回复 22% 生命。',interval:3,type:'heal',factor:.22},
    {id:'turtle',name:'玄武',quality:4,icon:'turtle',weight:6,skill:'玄水护身',description:'每 2 回合回复 14% 生命，提供额外防御。',interval:2,type:'heal',factor:.14},
    {id:'dragon',name:'应龙',quality:4,icon:'dragon',weight:4,skill:'九霄龙吟',description:'每 3 回合造成 250% 攻击伤害。',interval:3,type:'attack',factor:2.5},
    {id:'phoenix',name:'朱雀',quality:5,icon:'phoenix',weight:1,skill:'焚天凤羽',description:'每 2 回合造成 200% 攻击伤害。',interval:2,type:'attack',factor:2}
  ];
  const SPIRITS = [
    {id:'bamboo',name:'竹精',icon:'leaf',description:'生命提升 6% / 星',stat:'hp',amount:.06},
    {id:'stone',name:'山石翁',icon:'mountain',description:'防御提升 8% / 星',stat:'def',amount:.08},
    {id:'flame',name:'焰灵',icon:'flame',description:'攻击提升 5% / 星',stat:'atk',amount:.05},
    {id:'wind',name:'风行客',icon:'wind',description:'闪避提升 3% / 星',stat:'dodge',amount:.03},
    {id:'lotus',name:'莲花仙',icon:'lotus',description:'吸血提升 3% / 星',stat:'lifesteal',amount:.03},
    {id:'thunder',name:'雷公',icon:'bolt',description:'暴击提升 4% / 星',stat:'crit',amount:.04}
  ];
  const SKILLS = [
    {id:'sword',name:'御剑术',icon:'sword',realm:0,description:'每 4 回合造成 160% 攻击伤害。',type:'attack',factor:1.6},
    {id:'heal',name:'回春术',icon:'lotus',realm:3,description:'每 4 回合回复 30% 最大生命。',type:'heal',factor:.3},
    {id:'thunder',name:'天雷引',icon:'bolt',realm:6,description:'每 4 回合造成 280% 攻击伤害。',type:'attack',factor:2.8}
  ];
  const TRAININGS = {atk:{name:'淬炼锋芒',icon:'sword',description:'每级增加 8 点基础攻击'},hp:{name:'锻体养元',icon:'heart',description:'每级增加 48 点基础生命'},def:{name:'金身护体',icon:'shield',description:'每级增加 5 点基础防御'},speed:{name:'踏风而行',icon:'wind',description:'每级增加 2 点基础速度'}};
  const QUESTS = [
    {id:'chop5',name:'初识仙树',text:'砍树 5 次',key:'chops',goal:5,rewards:{peaches:25,gold:180}},
    {id:'equip3',name:'整装出发',text:'装备 3 件装备',key:'equipped',goal:3,rewards:{peaches:20,gems:40}},
    {id:'stage3',name:'初闯山林',text:'通关 3 个冒险关卡',key:'stages',goal:3,rewards:{peaches:30,eggs:1}},
    {id:'tree2',name:'仙树萌芽',text:'仙树达到 2 级',key:'tree',goal:2,rewards:{gems:60,gold:300}},
    {id:'realm1',name:'踏上仙途',text:'突破一次境界',key:'realm',goal:1,rewards:{eggs:1,food:100}},
    {id:'summon1',name:'结下仙缘',text:'召唤灵兽 1 次',key:'summons',goal:1,rewards:{peaches:25,food:120}},
    {id:'chop80',name:'斧下有乾坤',text:'累计砍树 80 次',key:'chops',goal:80,rewards:{gems:120,food:200}},
    {id:'pet5',name:'同游山海',text:'任一灵兽达到 5 级',key:'petLevel',goal:5,rewards:{eggs:2,peaches:60}},
    {id:'tower5',name:'镇魔初显',text:'通关镇魔塔 5 层',key:'floors',goal:5,rewards:{food:300,gems:200}},
    {id:'realm6',name:'金丹有望',text:'达到结丹初期',key:'realm',goal:6,rewards:{peaches:300,gems:300}}
  ];
  const DAILY = [
    {id:'dailyChop',name:'山中勤修',text:'今日砍树 30 次',key:'chops',goal:30,rewards:{peaches:40,gold:500}},
    {id:'dailyWin',name:'降妖卫道',text:'今日赢得 5 场战斗',key:'wins',goal:5,rewards:{gems:60,food:90}},
    {id:'dailyTrain',name:'精进不辍',text:'今日修炼 3 次',key:'trains',goal:3,rewards:{food:60,gold:300}}
  ];
  const RESOURCE_NAMES = {peaches:'仙桃',gold:'灵石',gems:'仙玉',eggs:'御灵符',food:'灵兽果'};
  const AREAS = ['青竹山','桃花涧','落霞谷','听雪峰','云梦泽','幽冥林','九霄天'];
  const ENEMIES = ['山中野狼','山魈','赤羽妖','石甲兽','守山妖王'];
  const MAX_REALM = 29;
  const MAX_TREE = 20;
  function clamp(n,min,max) { return Math.min(max,Math.max(min,n)); }
  function int(n,min=0,max=1e12) { if (!Number.isFinite(n) || typeof n !== 'number') throw new Error('存档包含无效数值'); return clamp(Math.floor(n),min,max); }
  function day(now=Date.now()) { return new Date(now+8*3600000).toISOString().slice(0,10); }
  function realmName(r) { return REALMS[Math.floor(r/3)] + ['初期','中期','后期'][r%3]; }
  function realmXp(r) { return Math.round(60*Math.pow(1.35,r)); }
  function realmCost(r) { return Math.round(180*Math.pow(1.25,r)); }
  function treeCost(l) { return Math.round(320*Math.pow(1.48,l-1)); }
  function trainCost(l) { return Math.round(160*Math.pow(1.3,l)); }
  function petCost(l) { return Math.round(25*Math.pow(1.18,l-1)); }
  function baseStats(r) { const scale=Math.pow(1.25,r); return {atk:Math.round(28*scale),hp:Math.round(300*scale),def:Math.round(8*scale),speed:Math.round(14*Math.pow(1.09,r)),combo:.03,crit:.05,counter:.01,lifesteal:0,dodge:.02,stun:0}; }
  function power(st) { return Math.round(st.atk*5+st.def*4+st.hp*.35+st.speed*2+Object.keys(TRAITS).reduce((sum,key)=>sum+st[key]*800,0)); }
  function itemScore(item,flow='power') { if(!item) return 0; return Math.round(item.atk*5+item.def*4+item.hp*.35+item.speed*2+item.affixes.reduce((sum,a)=>sum+a.value*(a.key===flow?5500:800),0)); }
  function fresh(now=Date.now()) {
    return {name:'无名小妖',createdAt:now,lastTick:now,realm:0,xp:0,tree:1,resources:{peaches:120,gold:600,gems:180,eggs:2,food:120},equipment:{},bag:[],nextItem:1,pets:[{id:'fox',level:1}],activePet:'fox',spirits:[{id:'bamboo',star:1}],activeSpirits:['bamboo'],training:{atk:0,hp:0,def:0,speed:0},skill:'sword',stage:1,tower:1,rating:1000,counts:{chops:0,wins:0,summons:0,trains:0},claimed:[],daily:{date:day(now),chops:0,wins:0,trains:0,claimed:[],checked:false},checkIns:0,pity:0,petPity:0,settings:{sound:false,motion:true,battleSpeed:1,autoFlow:'power'},log:[],revision:0};
  }
  function normalizeItem(item) {
    if (!item || typeof item!=='object' || !SLOTS.some(slot=>slot.id===item.slot) || !Array.isArray(item.affixes)) throw new Error('装备存档不完整');
    if (typeof item.id!=='string' || !/^item-\d+$/.test(item.id)) throw new Error('装备编号无效');
    return {id:item.id,slot:item.slot,quality:int(item.quality,0,6),level:int(item.level,1,1000),name:String(item.name||'无名法器').slice(0,40),atk:int(item.atk,0,1e8),hp:int(item.hp,0,1e9),def:int(item.def,0,1e8),speed:int(item.speed,0,1e6),affixes:item.affixes.slice(0,2).map(a=>{if(!a||!Object.hasOwn(TRAITS,a.key)||!Number.isFinite(a.value)||typeof a.value!=='number')throw new Error('装备词条无效');return {key:a.key,value:clamp(a.value,0,.3)};})};
  }
  function normalize(s,now=Date.now()) {
    if(!s || typeof s!=='object' || !s.resources || !Array.isArray(s.bag) || !Array.isArray(s.pets)) throw new Error('这不是有效的游戏存档');
    const n=fresh(now);
    n.name=String(s.name||n.name).trim().slice(0,16)||n.name;
    ['realm','tree','xp','stage','tower','rating','nextItem','pity','petPity','checkIns','revision'].forEach(key=> {if(s[key]!==undefined)n[key]=int(s[key]);});
    n.realm=clamp(n.realm,0,MAX_REALM); n.tree=clamp(n.tree,1,MAX_TREE); n.stage=clamp(n.stage,1,181); n.tower=clamp(n.tower,1,101); n.nextItem=Math.max(1,n.nextItem);
    n.createdAt=s.createdAt===undefined?now:int(s.createdAt,0,now); n.lastTick=s.lastTick===undefined?now:int(s.lastTick,0,now);
    Object.keys(n.resources).forEach(key=>n.resources[key]=int(s.resources[key]));
    n.bag=s.bag.slice(0,80).map(normalizeItem); n.equipment={};
    SLOTS.forEach(slot=>{if(s.equipment?.[slot.id]) {const item=normalizeItem(s.equipment[slot.id]);if(item.slot!==slot.id)throw new Error('装备栏与装备不匹配');n.equipment[slot.id]=item;}});
    const ids=[...n.bag,...Object.values(n.equipment)].map(item=>item.id);
    if(new Set(ids).size!==ids.length)throw new Error('存档包含重复装备编号');
    n.nextItem=Math.max(n.nextItem,...ids.map(id=>Number(id.slice(5))+1));
    n.pets=s.pets.slice(0,PETS.length).map(p=>{if(!PETS.some(x=>x.id===p.id))throw new Error('灵兽信息无效');return {id:p.id,level:int(p.level,1,40)};});
    if(new Set(n.pets.map(p=>p.id)).size!==n.pets.length)throw new Error('灵兽信息重复');
    if(!n.pets.length)throw new Error('存档缺少初始灵兽');
    n.activePet=n.pets.some(p=>p.id===s.activePet)?s.activePet:n.pets[0].id;
    n.spirits=(s.spirits||[]).slice(0,SPIRITS.length).map(p=>{if(!SPIRITS.some(x=>x.id===p.id))throw new Error('精怪信息无效');return {id:p.id,star:int(p.star,1,5)};});
    if(new Set(n.spirits.map(p=>p.id)).size!==n.spirits.length)throw new Error('精怪信息重复');
    n.activeSpirits=[...new Set((s.activeSpirits||[]).filter(id=>n.spirits.some(p=>p.id===id)))].slice(0,spiritSlots(n.realm));
    Object.keys(n.training).forEach(key=>n.training[key]=s.training?.[key]===undefined?0:int(s.training[key],0,30));
    n.skill=SKILLS.some(skill=>skill.id===s.skill&&skill.realm<=n.realm)?s.skill:'sword';
    Object.keys(n.counts).forEach(key=>n.counts[key]=s.counts?.[key]===undefined?0:int(s.counts[key],0,1e9));
    n.claimed=QUESTS.filter(q=>s.claimed?.includes(q.id)).map(q=>q.id);
    if(s.daily?.date===day(now)) {n.daily={date:day(now),chops:int(s.daily.chops||0),wins:int(s.daily.wins||0),trains:int(s.daily.trains||0),checked:s.daily.checked===true,claimed:DAILY.filter(q=>s.daily.claimed?.includes(q.id)).map(q=>q.id)};}
    n.settings.sound=s.settings?.sound===true; n.settings.motion=s.settings?.motion!==false; n.settings.battleSpeed=s.settings?.battleSpeed===2?2:1;
    n.settings.autoFlow=s.settings?.autoFlow==='power'||Object.hasOwn(TRAITS,s.settings?.autoFlow)?s.settings.autoFlow:'power';
    n.log=(s.log||[]).slice(0,12).map(x=>String(x).slice(0,150));
    return n;
  }
  function spiritSlots(realm) { return realm>=9?3:realm>=3?2:1; }
  function wrap(state,now=Date.now()) { return {format:FORMAT,version:VERSION,savedAt:now,state}; }
  function parseSave(input,now=Date.now()) {
    const data=typeof input==='string'?JSON.parse(input):input;
    if(data?.format!==FORMAT||data?.version!==VERSION)throw new Error('请选择本游戏导出的 v1 存档文件');
    return normalize(data.state,now);
  }
  function getStats(s) {
    const st=baseStats(s.realm);
    st.atk+=s.training.atk*8; st.hp+=s.training.hp*48; st.def+=s.training.def*5; st.speed+=s.training.speed*2;
    Object.values(s.equipment).forEach(item=>{['atk','hp','def','speed'].forEach(key=>st[key]+=item[key]);item.affixes.forEach(a=>st[a.key]+=a.value);});
    const pet=s.pets.find(p=>p.id===s.activePet), pd=PETS.find(p=>p.id===s.activePet);
    if(pet&&pd) {const scale=1+pet.level*(.015+pd.quality*.004);st.atk=Math.round(st.atk*scale);st.hp=Math.round(st.hp*scale);if(pd.id==='turtle')st.def=Math.round(st.def*(1+.12+pet.level*.012));}
    s.activeSpirits.forEach(id=>{const owned=s.spirits.find(p=>p.id===id),sd=SPIRITS.find(p=>p.id===id);if(!owned||!sd)return;if(Object.hasOwn(TRAITS,sd.stat))st[sd.stat]+=sd.amount*owned.star;else st[sd.stat]=Math.round(st[sd.stat]*(1+sd.amount*owned.star));});
    Object.keys(TRAITS).forEach(key=>st[key]=clamp(st[key],0,key==='dodge'?.45:key==='stun'?.35:key==='lifesteal'?.5:.7));
    return st;
  }
  function weighted(list,rng) {const total=list.reduce((a,b)=>a+b.weight,0);let n=rng()*total;for(const item of list){n-=item.weight;if(n<=0)return item;}return list[list.length-1];}
  function generateItem(s,rng) {
    const slot=SLOTS[Math.min(SLOTS.length-1,Math.floor(rng()*SLOTS.length))];
    const weights=[Math.max(5,50-s.tree*3),30,15+s.tree,Math.max(0,(s.tree-1)*3),Math.max(0,(s.tree-3)*2),Math.max(0,(s.tree-7)*1.4),Math.max(0,(s.tree-13)*.8)];
    let quality=weighted(weights.map((weight,index)=>({weight,index})),rng).index;
    s.pity++;if(s.pity>=20&&quality<2)quality=2;if(quality>=2)s.pity=0;
    const scale=Math.pow(1.23,s.realm)*(1+.035*(s.tree-1))*QUALITIES[quality].factor;
    const roll=()=>.8+rng()*.4;
    const item={id:'item-'+s.nextItem++,slot:slot.id,quality,level:s.realm+1,name:['青竹','听风','流云','紫霄','太虚','天衍','鸿蒙'][quality]+slot.name,atk:Math.round((slot.id==='weapon'?17:5)*scale*roll()),hp:Math.round((slot.id==='robe'?105:38)*scale*roll()),def:Math.round((['robe','crown','belt'].includes(slot.id)?7:3)*scale*roll()),speed:Math.max(1,Math.round((slot.id==='boots'?5:1)*Math.pow(1.06,s.realm)*roll())),affixes:[]};
    const keys=Object.keys(TRAITS);for(let i=0;i<(quality>=3?2:1);i++){const key=keys.splice(Math.min(keys.length-1,Math.floor(rng()*keys.length)),1)[0];item.affixes.push({key,value:Math.round((.025+quality*.015+rng()*.025)*1000)/1000});}
    return item;
  }
  function questValue(s,key) {return key==='equipped'?Object.keys(s.equipment).length:key==='stages'?s.stage-1:key==='floors'?s.tower-1:key==='petLevel'?Math.max(0,...s.pets.map(p=>p.level)):s.counts[key]??s[key]??0;}
  function simulateBattle(playerStats,enemyStats,options={}) {
    const rng=options.rng||Math.random;
    const p={...playerStats,maxHp:playerStats.hp,hp:playerStats.hp,stunned:false};
    const e={...enemyStats,maxHp:enemyStats.hp,hp:enemyStats.hp,stunned:false};
    const events=[]; let round=0;
    const emit=(actor,type,text,amount=0)=>events.push({round,actor,type,text,amount,pHp:p.hp,eHp:e.hp,pMax:p.maxHp,eMax:e.maxHp});
    function damage(from,to,amount,actor,type,text) {amount=Math.min(to.hp,Math.max(1,Math.round(amount)));to.hp=Math.max(0,to.hp-amount);emit(actor,type,text,amount);return amount;}
    function heal(who,amount,actor,text) {amount=Math.max(0,Math.min(who.maxHp-who.hp,Math.round(amount)));who.hp+=amount;emit(actor,'heal',text,amount);}
    function strike(a,b,actor,combo=false) {
      if(rng()<b.dodge){emit(actor,'dodge',actor==='player'?'对手闪避了攻击':'你闪避了攻击');return;}
      const critical=rng()<a.crit;
      const amount=damage(a,b,Math.max(3,a.atk-b.def*.65)*(combo?.65:1)*(critical?1.8:1),actor,critical?'crit':combo?'combo':'hit',critical?'暴击！':combo?'追击！':'普通攻击');
      if(a.lifesteal>0&&a.hp>0)heal(a,amount*a.lifesteal,actor,'吸血');
      if(b.hp>0&&rng()<a.stun){b.stunned=true;emit(actor,'stun','击晕对手');}
      if(b.hp>0&&rng()<b.counter){damage(b,a,Math.max(2,b.atk-a.def*.65)*.75,actor==='player'?'enemy':'player','counter','反击！');}
    }
    function turn(a,b,actor) {
      if(a.hp<=0||b.hp<=0)return;
      if(a.stunned){a.stunned=false;emit(actor,'skip','被击晕，无法行动');return;}
      if(actor==='player'&&options.pet&&round%options.pet.interval===0) {
        const pet=options.pet,bonus=1+(options.petLevel||1)*.025;
        if(pet.type==='heal')heal(a,a.maxHp*pet.factor*bonus,actor,pet.name+' · '+pet.skill);
        else damage(a,b,Math.max(4,a.atk*pet.factor*bonus-b.def*.35),actor,'pet',pet.name+' · '+pet.skill);
      }
      if(b.hp<=0)return;
      if(actor==='player'&&options.skill&&round%4===0){const skill=options.skill;if(skill.type==='heal')heal(a,a.maxHp*skill.factor,actor,skill.name);else damage(a,b,Math.max(5,a.atk*skill.factor-b.def*.35),actor,'skill',skill.name);}
      if(b.hp<=0)return;
      strike(a,b,actor);if(a.hp>0&&b.hp>0&&rng()<a.combo)strike(a,b,actor,true);
    }
    for(round=1;round<=30&&p.hp>0&&e.hp>0;round++){if(p.speed>=e.speed){turn(p,e,'player');turn(e,p,'enemy');}else{turn(e,p,'enemy');turn(p,e,'player');}}
    return {win:e.hp<=0&&p.hp>0,timeout:p.hp>0&&e.hp>0,rounds:round-1,events,playerHp:p.hp,enemyHp:e.hp};
  }
  class Game {
    constructor(state=fresh(),options={}) {this.rng=options.rng||Math.random;this.now=options.now||Date.now;this.state=normalize(state,this.now());this.battle=null;this.battleSequence=0;}
    idle(){if(this.battle)throw new Error('正在战斗，请先结束战斗');}
    daily(){const s=this.state;if(s.daily.date!==day(this.now()))s.daily={date:day(this.now()),chops:0,wins:0,trains:0,claimed:[],checked:false};}
    log(text){this.state.log.unshift(text);this.state.log=this.state.log.slice(0,12);}
    rewards(rewards){Object.entries(rewards).forEach(([key,val])=>{if(Object.hasOwn(this.state.resources,key))this.state.resources[key]=clamp(this.state.resources[key]+val,0,1e12);});}
    spend(key,cost){if(this.state.resources[key]<cost)throw new Error(RESOURCE_NAMES[key]+'不足');this.state.resources[key]-=cost;}
    tick(){this.daily();const s=this.state,now=this.now();if(now<s.lastTick){s.lastTick=now;return null;}const elapsed=now-s.lastTick;const ticks=Math.min(1440,Math.floor(elapsed/30000));if(!ticks)return null;const rewards={peaches:ticks,gold:ticks*(4+s.tree)};this.rewards(rewards);if(s.realm<MAX_REALM)s.xp=clamp(s.xp+ticks*2,0,1e12);s.lastTick=now-(elapsed%30000);return {...rewards,xp:ticks*2,seconds:Math.min(elapsed/1000,43200)};}
    stats(){return getStats(this.state);}
    chop(auto=false){this.idle();this.daily();const s=this.state;this.spend('peaches',1);s.counts.chops++;s.daily.chops++;s.xp=clamp(s.xp+10+Math.floor(s.tree/3),0,1e12);const item=generateItem(s,this.rng);s.bag.push(item);let resolution='bag';
      if(auto){const old=s.equipment[item.slot];if(itemScore(item,s.settings.autoFlow)>itemScore(old,s.settings.autoFlow)){this.equip(item.id);if(old)this.sell(old.id);resolution='equipped';}else{this.sell(item.id);resolution='sold';}}
      while(s.bag.length>80){const old=s.bag.shift();this.rewards({gold:this.sellValue(old)});}
      if(item.quality>=3)this.log('仙树赐宝：'+QUALITIES[item.quality].name+' · '+item.name);
      return {item,resolution};
    }
    sellValue(item){return Math.round((18+item.quality*15)*(1+this.state.realm*.15));}
    equip(id){this.idle();const s=this.state,index=s.bag.findIndex(x=>x.id===id);if(index<0)throw new Error('装备已不在背包中');const [item]=s.bag.splice(index,1),old=s.equipment[item.slot];s.equipment[item.slot]=item;if(old)s.bag.push(old);return item;}
    sell(id){this.idle();const index=this.state.bag.findIndex(x=>x.id===id);if(index<0)throw new Error('装备已不在背包中');const [item]=this.state.bag.splice(index,1),gold=this.sellValue(item);this.rewards({gold});return gold;}
    equipBest(){this.idle();const s=this.state;let count=0;SLOTS.forEach(slot=>{const best=s.bag.filter(i=>i.slot===slot.id).sort((a,b)=>itemScore(b,s.settings.autoFlow)-itemScore(a,s.settings.autoFlow))[0];if(best&&itemScore(best,s.settings.autoFlow)>itemScore(s.equipment[slot.id],s.settings.autoFlow)){this.equip(best.id);count++;}});return count;}
    sellInferior(){this.idle();let total=0;const s=this.state;const protectedIds=new Set(SLOTS.map(slot=>s.bag.filter(i=>i.slot===slot.id).sort((a,b)=>itemScore(b,s.settings.autoFlow)-itemScore(a,s.settings.autoFlow))[0]).filter(i=>i&&itemScore(i,s.settings.autoFlow)>itemScore(s.equipment[i.slot],s.settings.autoFlow)).map(i=>i.id));for(const item of [...s.bag])if(!protectedIds.has(item.id)&&itemScore(item,s.settings.autoFlow)<=itemScore(s.equipment[item.slot],s.settings.autoFlow)){total+=this.sell(item.id);}return total;}
    upgradeTree(){this.idle();const s=this.state;if(s.tree>=MAX_TREE)throw new Error('仙树已达到最高等级');this.spend('gold',treeCost(s.tree));s.tree++;this.log('仙树升至 '+s.tree+' 级，更多珍宝即将现世');return s.tree;}
    train(key){this.idle();this.daily();if(!Object.hasOwn(TRAININGS,key))throw new Error('修炼项目无效');const s=this.state;if(s.training[key]>=30)throw new Error('这项修炼已圆满');this.spend('gold',trainCost(s.training[key]));s.training[key]++;s.counts.trains++;s.daily.trains++;return s.training[key];}
    summonPet(){this.idle();const s=this.state;this.spend('eggs',1);s.counts.summons++;s.petPity++;let pet=weighted(PETS,this.rng);if(s.petPity>=20&&pet.quality<4)pet=PETS[5];if(pet.quality>=4)s.petPity=0;const existing=s.pets.find(p=>p.id===pet.id);if(existing)this.rewards({food:40+pet.quality*30});else{s.pets.push({id:pet.id,level:1});if(!s.activePet)s.activePet=pet.id;}this.log((existing?'重逢':'结缘')+'灵兽 · '+pet.name);return {pet,duplicate:!!existing,food:existing?40+pet.quality*30:0};}
    petLevel(id){this.idle();const pet=this.state.pets.find(p=>p.id===id);if(!pet)throw new Error('尚未结缘这只灵兽');if(pet.level>=40)throw new Error('灵兽已达到最高等级');this.spend('food',petCost(pet.level));return ++pet.level;}
    setPet(id){this.idle();if(!this.state.pets.some(p=>p.id===id))throw new Error('尚未结缘这只灵兽');this.state.activePet=id;}
    summonSpirit(){this.idle();this.spend('gems',70);const spirit=SPIRITS[Math.min(SPIRITS.length-1,Math.floor(this.rng()*SPIRITS.length))];const existing=this.state.spirits.find(p=>p.id===spirit.id);if(existing){if(existing.star<5)existing.star++;else this.rewards({gems:35});}else this.state.spirits.push({id:spirit.id,star:1});this.log('收服精怪 · '+spirit.name);return {spirit,duplicate:!!existing};}
    toggleSpirit(id){this.idle();const s=this.state;if(!s.spirits.some(p=>p.id===id))throw new Error('尚未收服这只精怪');const i=s.activeSpirits.indexOf(id);if(i>=0)s.activeSpirits.splice(i,1);else{if(s.activeSpirits.length>=spiritSlots(s.realm))throw new Error('精怪位置已满，请先撤下一个精怪');s.activeSpirits.push(id);}}
    setSkill(id){this.idle();if(!SKILLS.some(skill=>skill.id===id&&skill.realm<=this.state.realm))throw new Error('境界不足，尚未领悟此神通');this.state.skill=id;}
    claimQuest(id,daily=false){this.idle();this.daily();const s=this.state,q=(daily?DAILY:QUESTS).find(q=>q.id===id);if(!q)throw new Error('任务不存在');const claimed=daily?s.daily.claimed:s.claimed,value=daily?s.daily[q.key]:questValue(s,q.key);if(claimed.includes(id))throw new Error('这份奖励已经领取');if(value<q.goal)throw new Error('任务尚未完成');claimed.push(id);this.rewards(q.rewards);return q.rewards;}
    checkIn(){this.idle();this.daily();const s=this.state;if(s.daily.checked)throw new Error('今日仙礼已经领取');s.daily.checked=true;s.checkIns++;const rewards={peaches:50,gold:300,gems:30,food:30};if(s.checkIns%3===0)rewards.eggs=1;this.rewards(rewards);this.log('领取第 '+s.checkIns+' 日仙礼');return rewards;}
    buy(id){this.idle();const packs={peaches:{price:25,rewards:{peaches:30}},eggs:{price:80,rewards:{eggs:1}},food:{price:40,rewards:{food:100}},gold:{price:35,rewards:{gold:600}}};if(!Object.hasOwn(packs,id))throw new Error('商品不存在');const pack=packs[id];this.spend('gems',pack.price);this.rewards(pack.rewards);return pack.rewards;}
    enemy(kind,target=0){const s=this.state;let st,name,icon='wolf',title;
      if(kind==='trial'){st=baseStats(s.realm+1);st.atk=Math.round(st.atk*.85);st.hp=Math.round(st.hp*1.08);st.crit=.08;name='雷劫化身';icon='thunder-demon';title='突破 · '+realmName(Math.min(MAX_REALM,s.realm+1));}
      else if(kind==='tower'){const f=s.tower,scale=Math.pow(1.10,f-1);st={...baseStats(0),atk:Math.round(45*scale),hp:Math.round(460*scale),def:Math.round(12*scale),speed:Math.round(17*Math.pow(1.018,f)),counter:.08,crit:.08};name=f%5===0?'镇魔守将':'幽冥魔影';icon='demon';title='镇魔塔 · 第 '+f+' 层';}
      else if(kind==='arena'){target=clamp(target,0,2);const scale=Math.pow(1.053,s.stage-1)*(1+target*.42);st={...baseStats(0),atk:Math.round(40*scale),hp:Math.round(430*scale),def:Math.round(10*scale),speed:Math.round(18*Math.pow(1.015,s.stage-1)*(1+target*.1)),combo:.08+target*.04,crit:.08+target*.03,dodge:.04};name=['竹林散人','听雪道人','九霄剑客'][target];icon=['fox','bai','tiger'][target];title='论道切磋 · '+name;}
      else if(kind==='adventure'){const n=s.stage,scale=Math.pow(1.055,n-1),boss=n%5===0;st={...baseStats(0),atk:Math.round(25*scale*(boss?1.2:1)),hp:Math.round(210*scale*(boss?1.4:1)),def:Math.round(5*scale),speed:Math.round(10*Math.pow(1.015,n)),crit:boss?.1:.04,stun:boss?.06:0};name=ENEMIES[(n-1)%5];icon=boss?'demon':'wolf';title=AREAS[Math.min(AREAS.length-1,Math.floor((n-1)/5))]+' · 第 '+n+' 关';}
      else throw new Error('未知战斗类型');
      return {...st,name,icon,title,kind,target,power:power(st)};
    }
    beginBattle(kind,target=0){this.idle();this.daily();const s=this.state;if(kind==='adventure'&&s.stage>180)throw new Error('冒险已全部通关');if(kind==='tower'&&s.tower>100)throw new Error('镇魔塔已全部通关');if(kind==='trial'){if(s.realm>=MAX_REALM)throw new Error('你已达到此方世界的最高境界');if(s.xp<realmXp(s.realm))throw new Error('修为不足，先继续砍树或静修');this.spend('gold',realmCost(s.realm));}
      const enemy=this.enemy(kind,target),pet=PETS.find(p=>p.id===s.activePet),petLevel=s.pets.find(p=>p.id===s.activePet)?.level||0,skill=SKILLS.find(k=>k.id===s.skill),result=simulateBattle(this.stats(),enemy,{rng:this.rng,pet,petLevel,skill});
      const battle={id:++this.battleSequence,kind,target,enemy,result,realm:s.realm,stage:s.stage,tower:s.tower};this.battle=battle;return battle;
    }
    finishBattle(id){if(!this.battle||this.battle.id!==id)throw new Error('这场战斗已结束');const battle=this.battle;this.battle=null;const s=this.state;let rewards={};if(battle.result.win){s.counts.wins++;s.daily.wins++;
        if(battle.kind==='trial'){s.xp=Math.max(0,s.xp-realmXp(battle.realm));s.realm=Math.min(MAX_REALM,s.realm+1);rewards={peaches:20,gems:25};this.log('渡劫成功 · '+realmName(s.realm));}
        if(battle.kind==='adventure'){s.stage=Math.min(181,s.stage+1);rewards={peaches:8+(battle.stage%5===0?12:0),gold:90+battle.stage*12,gems:battle.stage%5===0?35:8,food:8};if(battle.stage%10===0)rewards.eggs=1;s.xp=clamp(s.xp+20+battle.stage*2,0,1e12);this.log('通关 '+battle.enemy.title);}
        if(battle.kind==='tower'){s.tower=Math.min(101,s.tower+1);rewards={peaches:15,gold:150+battle.tower*25,gems:15,food:30+battle.tower*5};if(battle.tower%5===0)rewards.eggs=1;this.log('镇魔塔通关第 '+battle.tower+' 层');}
        if(battle.kind==='arena'){s.rating+=25+battle.target*15;rewards={gold:50+battle.target*30,food:8+battle.target*4};}
        this.rewards(rewards);
      }else if(battle.kind==='arena')s.rating=Math.max(0,s.rating-10);
      return {...battle.result,rewards,kind:battle.kind};
    }
    cancelBattle(){this.battle=null;}
    rename(name){this.idle();name=String(name).trim().slice(0,16);if(!name)throw new Error('道号不能为空');this.state.name=name;}
    setting(key,value){if(!Object.hasOwn(this.state.settings,key))throw new Error('未知设置');if(key==='sound'||key==='motion')this.state.settings[key]=value===true;else if(key==='battleSpeed')this.state.settings[key]=value===2?2:1;else if(key==='autoFlow'&&(value==='power'||Object.hasOwn(TRAITS,value)))this.state.settings[key]=value;}
    serialize(){this.state.revision++;return JSON.stringify(wrap(this.state,this.now()));}
    import(input){this.idle();const next=parseSave(input,this.now());this.state=next;return this.tick();}
  }
  const API={FORMAT,VERSION,SLOTS,QUALITIES,TRAITS,REALMS,PETS,SPIRITS,SKILLS,TRAININGS,QUESTS,DAILY,RESOURCE_NAMES,AREAS,MAX_REALM,MAX_TREE,Game,fresh,normalize,parseSave,wrap,getStats,simulateBattle,itemScore,power,realmName,realmXp,realmCost,treeCost,trainCost,petCost,questValue,spiritSlots,day};
  if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.XDCore=API;
})(typeof window!=='undefined'?window:globalThis);

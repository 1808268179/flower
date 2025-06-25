<template>
    <view class="home-container">
        <!-- 顶部导航栏 -->
        <view class="header">
            <view class="header-content">
                <view class="logo-section">
                    <text class="logo-icon">🌺</text>
                    <text class="app-name">兰花识别专家</text>
                </view>
                <view class="header-actions">
                    <button class="scan-btn" @click="goToRecognition">
                        <text class="scan-icon">📷</text>
                        <text class="scan-text">识别</text>
                    </button>
                </view>
            </view>
        </view>

        <!-- 搜索栏 -->
        <view class="search-section">
            <view class="search-box">
                <text class="search-icon">🔍</text>
                <input class="search-input" placeholder="搜索兰花品种..." v-model="searchKeyword" @input="onSearch"/>
            </view>
        </view>

        <!-- 分类导航 -->
        <view class="category-nav">
            <scroll-view class="category-scroll" scroll-x="true" show-scrollbar="false">
                <view class="category-list">
                    <view 
                        class="category-item" 
                        :class="{ 'active': selectedCategory === category.id }"
                        v-for="category in categories" 
                        :key="category.id"
                        @click="selectCategory(category.id)"
                    >
                        <text class="category-icon">{{ category.icon }}</text>
                        <text class="category-name">{{ category.name }}</text>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 兰花品种展示 -->
        <view class="orchids-section">
            <view class="section-header">
                <text class="section-title">{{ getCurrentCategoryName() }}</text>
                <text class="section-count">共 {{ filteredOrchids.length }} 种</text>
            </view>
            
            <view class="orchids-grid">
                <view 
                    class="orchid-card" 
                    v-for="orchid in filteredOrchids" 
                    :key="orchid.id"
                    @click="showOrchidDetail(orchid)"
                >
                    <view class="card-image">
                        <image :src="orchid.image" class="orchid-image" mode="aspectFill"/>
                        <view class="image-overlay">
                            <view class="confidence-badge" v-if="orchid.isPopular">
                                <text class="badge-text">热门</text>
                            </view>
                        </view>
                    </view>
                    
                    <view class="card-content">
                        <view class="orchid-info">
                            <text class="orchid-name">{{ orchid.name }}</text>
                            <text class="orchid-latin">{{ orchid.latin }}</text>
                        </view>
                        
                        <view class="orchid-features">
                            <view class="feature-tag" v-for="feature in orchid.features.slice(0, 2)" :key="feature">
                                <text class="feature-text">{{ feature }}</text>
                            </view>
                        </view>
                        
                        <view class="card-footer">
                            <view class="difficulty-level">
                                <text class="difficulty-label">养护难度:</text>
                                <view class="difficulty-stars">
                                    <text 
                                        class="star" 
                                        :class="{ 'filled': i <= orchid.difficulty }"
                                        v-for="i in 5" 
                                        :key="i"
                                    >⭐</text>
                                </view>
                            </view>
                            <text class="view-detail">查看详情 →</text>
                        </view>
                    </view>
                </view>
            </view>
            
            <!-- 加载更多 -->
            <view class="load-more" v-if="hasMore">
                <button class="load-more-btn" @click="loadMore" :disabled="loading">
                    <text class="load-text">{{ loading ? '加载中...' : '加载更多' }}</text>
                </button>
            </view>
        </view>

        <!-- 兰花详情弹窗 -->
        <view class="detail-modal" v-if="showDetail" @click="closeDetail">
            <view class="modal-content" @click.stop>
                <view class="modal-header">
                    <view class="close-btn" @click="closeDetail">
                        <text class="close-icon">✕</text>
                    </view>
                </view>
                
                <view class="detail-content" v-if="selectedOrchid">
                    <view class="detail-image">
                        <image :src="selectedOrchid.image" class="detail-orchid-image" mode="aspectFill"/>
                    </view>
                    
                    <view class="detail-info">
                        <view class="detail-title">
                            <text class="detail-name">{{ selectedOrchid.name }}</text>
                            <text class="detail-latin">{{ selectedOrchid.latin }}</text>
                        </view>
                        
                        <view class="detail-description">
                            <text class="description-text">{{ selectedOrchid.description }}</text>
                        </view>
                        
                        <view class="detail-features">
                            <text class="features-title">主要特征</text>
                            <view class="features-grid">
                                <view class="feature-item" v-for="feature in selectedOrchid.features" :key="feature">
                                    <text class="feature-dot">•</text>
                                    <text class="feature-desc">{{ feature }}</text>
                                </view>
                            </view>
                        </view>
                        
                        <view class="care-info">
                            <text class="care-title">养护要点</text>
                            <view class="care-grid">
                                <view class="care-item">
                                    <text class="care-label">光照</text>
                                    <text class="care-value">{{ selectedOrchid.care.light }}</text>
                                </view>
                                <view class="care-item">
                                    <text class="care-label">温度</text>
                                    <text class="care-value">{{ selectedOrchid.care.temperature }}</text>
                                </view>
                                <view class="care-item">
                                    <text class="care-label">湿度</text>
                                    <text class="care-value">{{ selectedOrchid.care.humidity }}</text>
                                </view>
                                <view class="care-item">
                                    <text class="care-label">浇水</text>
                                    <text class="care-value">{{ selectedOrchid.care.watering }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            searchKeyword: '',
            selectedCategory: 'all',
            showDetail: false,
            selectedOrchid: null,
            loading: false,
            hasMore: true,
            categories: [
                { id: 'all', name: '全部', icon: '🌸' },
                { id: 'cymbidium', name: '兜兰', icon: '🌺' },
                { id: 'phalaenopsis', name: '蝴蝶兰', icon: '🦋' },
                { id: 'dendrobium', name: '石斛兰', icon: '🪨' },
                { id: 'cattleya', name: '卡特兰', icon: '💜' },
                { id: 'oncidium', name: '文心兰', icon: '💛' },
                { id: 'vanda', name: '万代兰', icon: '🟣' }
            ],
            orchids: [
                {
                    id: 1,
                    name: '春兰',
                    latin: 'Cymbidium goeringii',
                    category: 'cymbidium',
                    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                    features: ['花香清雅', '叶片细长', '花期较早', '单花开放'],
                    difficulty: 3,
                    isPopular: true,
                    description: '春兰是中国传统名花，被誉为"花中君子"。其花香清幽淡雅，花型端庄秀美，深受文人雅士喜爱。春兰通常在春季2-3月开花，花朵单生，色彩以绿、黄绿为主。',
                    care: {
                        light: '半阴环境',
                        temperature: '15-25°C',
                        humidity: '60-80%',
                        watering: '见干见湿'
                    }
                },
                {
                    id: 2,
                    name: '墨兰',
                    latin: 'Cymbidium sinense',
                    category: 'cymbidium',
                    image: 'https://images.unsplash.com/photo-1606411447662-88d1e1eb8529?w=400&h=300&fit=crop',
                    features: ['花色深紫', '叶宽厚实', '花期冬季', '花序较长'],
                    difficulty: 2,
                    isPopular: false,
                    description: '墨兰又称报岁兰，因其花色深邃如墨而得名。叶片宽大厚实，花序较长，通常在冬春季节开花，是春节期间的重要观赏花卉。',
                    care: {
                        light: '散射光',
                        temperature: '10-20°C',
                        humidity: '70-85%',
                        watering: '保持微湿'
                    }
                },
                {
                    id: 3,
                    name: '蝴蝶兰',
                    latin: 'Phalaenopsis amabilis',
                    category: 'phalaenopsis',
                    image: 'https://images.unsplash.com/photo-1583725707554-b60f35dba1d0?w=400&h=300&fit=crop',
                    features: ['花型似蝶', '色彩丰富', '花期较长', '叶片肉质'],
                    difficulty: 4,
                    isPopular: true,
                    description: '蝴蝶兰因花朵形似翩翩起舞的蝴蝶而得名，是最受欢迎的兰花品种之一。花色丰富多样，有白色、粉色、紫色等，花期可持续2-3个月。',
                    care: {
                        light: '明亮散射光',
                        temperature: '18-28°C',
                        humidity: '60-70%',
                        watering: '每周1-2次'
                    }
                },
                {
                    id: 4,
                    name: '石斛兰',
                    latin: 'Dendrobium nobile',
                    category: 'dendrobium',
                    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
                    features: ['茎杆肉质', '花朵繁密', '色彩艳丽', '适应性强'],
                    difficulty: 2,
                    isPopular: false,
                    description: '石斛兰是附生兰花，茎杆肉质直立，花朵沿茎杆密生开放，色彩艳丽。具有很好的观赏价值和药用价值，被誉为"九大仙草"之一。',
                    care: {
                        light: '半日照',
                        temperature: '15-25°C',
                        humidity: '50-70%',
                        watering: '春夏多浇'
                    }
                },
                {
                    id: 5,
                    name: '卡特兰',
                    latin: 'Cattleya labiata',
                    category: 'cattleya',
                    image: 'https://images.unsplash.com/photo-1518641117282-7269d7790651?w=400&h=300&fit=crop',
                    features: ['花大艳丽', '唇瓣发达', '香气浓郁', '假球茎明显'],
                    difficulty: 4,
                    isPopular: true,
                    description: '卡特兰被誉为"兰花之王"，花朵硕大美丽，色彩鲜艳，香气浓郁。唇瓣特别发达，是其最显著的特征。是制作胸花的首选兰花。',
                    care: {
                        light: '充足光照',
                        temperature: '20-30°C',
                        humidity: '60-80%',
                        watering: '干透浇透'
                    }
                },
                {
                    id: 6,
                    name: '文心兰',
                    latin: 'Oncidium varicosum',
                    category: 'oncidium',
                    image: 'https://images.unsplash.com/photo-1616201345529-d7e6c4bb5dd9?w=400&h=300&fit=crop',
                    features: ['花朵密集', '金黄色彩', '花型独特', '花期持久'],
                    difficulty: 3,
                    isPopular: false,
                    description: '文心兰又称跳舞兰，因其花朵形似翩翩起舞的少女而得名。花朵小而密集，通常呈金黄色，花序长而优美，观赏价值很高。',
                    care: {
                        light: '明亮光线',
                        temperature: '18-25°C',
                        humidity: '50-60%',
                        watering: '适度浇水'
                    }
                },
                {
                    id: 7,
                    name: '万代兰',
                    latin: 'Vanda coerulea',
                    category: 'vanda',
                    image: 'https://images.unsplash.com/photo-1593642702821-ecf12c7d5c79?w=400&h=300&fit=crop',
                    features: ['根系发达', '花色蓝紫', '耐高温', '喜阳光'],
                    difficulty: 5,
                    isPopular: false,
                    description: '万代兰是热带兰花，根系极为发达，多为气生根。花色以蓝紫色为主，非常罕见美丽。喜欢充足的阳光和高温高湿的环境。',
                    care: {
                        light: '全日照',
                        temperature: '25-35°C',
                        humidity: '70-90%',
                        watering: '每日喷水'
                    }
                },
                {
                    id: 8,
                    name: '建兰',
                    latin: 'Cymbidium ensifolium',
                    category: 'cymbidium',
                    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                    features: ['四季开花', '花香浓郁', '适应性强', '叶片挺立'],
                    difficulty: 2,
                    isPopular: true,
                    description: '建兰又称四季兰，一年可多次开花，花香浓郁持久。叶片挺立，植株健壮，适应性强，是初学者的理想选择。',
                    care: {
                        light: '半阴环境',
                        temperature: '15-28°C',
                        humidity: '60-75%',
                        watering: '见干见湿'
                    }
                }
            ]
        };
    },
    computed: {
        filteredOrchids() {
            let filtered = this.orchids;
            
            // 按分类筛选
            if (this.selectedCategory !== 'all') {
                filtered = filtered.filter(orchid => orchid.category === this.selectedCategory);
            }
            
            // 按搜索关键词筛选
            if (this.searchKeyword.trim()) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(orchid => 
                    orchid.name.toLowerCase().includes(keyword) ||
                    orchid.latin.toLowerCase().includes(keyword) ||
                    orchid.features.some(feature => feature.toLowerCase().includes(keyword))
                );
            }
            
            return filtered;
        }
    },
    methods: {
        goToRecognition() {
            uni.navigateTo({
                url: '/pages/Recognition/Recognition'
            });
        },
        
        onSearch() {
            // 搜索逻辑已在computed中处理
        },
        
        selectCategory(categoryId) {
            this.selectedCategory = categoryId;
        },
        
        getCurrentCategoryName() {
            const category = this.categories.find(cat => cat.id === this.selectedCategory);
            return category ? category.name : '全部品种';
        },
        
        showOrchidDetail(orchid) {
            this.selectedOrchid = orchid;
            this.showDetail = true;
        },
        
        closeDetail() {
            this.showDetail = false;
            this.selectedOrchid = null;
        },
        
        loadMore() {
            this.loading = true;
            // 模拟加载更多数据
            setTimeout(() => {
                this.loading = false;
                this.hasMore = false; // 暂时设置为没有更多数据
            }, 1000);
        }
    }
};
</script>

<style scoped>
.home-container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 头部区域 */
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 60px 20px 20px;
    color: white;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-icon {
    font-size: 32px;
}

.app-name {
    font-size: 20px;
    font-weight: bold;
}

.scan-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: white;
}

.scan-icon {
    font-size: 16px;
}

.scan-text {
    font-size: 14px;
    font-weight: 500;
}

/* 搜索区域 */
.search-section {
    padding: 20px;
    margin-top: -10px;
}

.search-box {
    background: white;
    border-radius: 25px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.search-icon {
    font-size: 18px;
    color: #999;
}

.search-input {
    flex: 1;
    font-size: 16px;
    border: none;
    outline: none;
}

/* 分类导航 */
.category-nav {
    padding: 0 20px 20px;
}

.category-scroll {
    white-space: nowrap;
}

.category-list {
    display: flex;
    gap: 15px;
}

.category-item {
    flex-shrink: 0;
    background: white;
    border-radius: 20px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 70px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.category-item.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    transform: scale(1.05);
}

.category-icon {
    font-size: 20px;
}

.category-name {
    font-size: 12px;
    font-weight: 500;
}

/* 兰花展示区域 */
.orchids-section {
    padding: 0 20px 40px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.section-count {
    font-size: 14px;
    color: #666;
}

.orchids-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.orchid-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.orchid-card:active {
    transform: scale(0.98);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.card-image {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.orchid-image {
    width: 100%;
    height: 100%;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 15px;
}

.confidence-badge {
    background: #ff6b6b;
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.card-content {
    padding: 20px;
}

.orchid-info {
    margin-bottom: 15px;
}

.orchid-name {
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 4px;
}

.orchid-latin {
    display: block;
    font-size: 14px;
    color: #666;
    font-style: italic;
}

.orchid-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
}

.feature-tag {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    padding: 4px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.difficulty-level {
    display: flex;
    align-items: center;
    gap: 8px;
}

.difficulty-label {
    font-size: 12px;
    color: #666;
}

.difficulty-stars {
    display: flex;
    gap: 2px;
}

.star {
    font-size: 12px;
    opacity: 0.3;
}

.star.filled {
    opacity: 1;
}

.view-detail {
    font-size: 14px;
    color: #667eea;
    font-weight: 500;
}

/* 加载更多 */
.load-more {
    margin-top: 30px;
    text-align: center;
}

.load-more-btn {
    background: white;
    border: 1px solid #ddd;
    border-radius: 25px;
    padding: 12px 30px;
    color: #667eea;
    font-size: 14px;
    font-weight: 500;
}

/* 详情弹窗 */
.detail-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
    max-height: 80vh;
    overflow: hidden;
    position: relative;
}

.modal-header {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 10;
}

.close-btn {
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-icon {
    color: white;
    font-size: 18px;
    font-weight: bold;
}

.detail-content {
    overflow-y: auto;
    max-height: 80vh;
}

.detail-image {
    height: 200px;
    overflow: hidden;
}

.detail-orchid-image {
    width: 100%;
    height: 100%;
}

.detail-info {
    padding: 20px;
}

.detail-title {
    margin-bottom: 15px;
}

.detail-name {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.detail-latin {
    display: block;
    font-size: 16px;
    color: #666;
    font-style: italic;
}

.detail-description {
    margin-bottom: 20px;
}

.description-text {
    font-size: 15px;
    color: #555;
    line-height: 1.6;
}

.detail-features {
    margin-bottom: 20px;
}

.features-title {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
}

.features-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.feature-dot {
    color: #667eea;
    font-weight: bold;
}

.feature-desc {
    font-size: 14px;
    color: #555;
}

.care-info {
    border-top: 1px solid #eee;
    padding-top: 20px;
}

.care-title {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
}

.care-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}

.care-item {
    background: #f8f9fa;
    padding: 12px;
    border-radius: 10px;
}

.care-label {
    display: block;
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
}

.care-value {
    display: block;
    font-size: 14px;
    color: #333;
    font-weight: 500;
}
</style>[]
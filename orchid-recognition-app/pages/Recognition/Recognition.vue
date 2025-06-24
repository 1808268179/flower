<template>
    <view class="recognition-container">
        <!-- 顶部装饰背景 -->
        <view class="header-decoration">
            <view class="decoration-circle circle-1"></view>
            <view class="decoration-circle circle-2"></view>
            <view class="decoration-circle circle-3"></view>
        </view>

        <!-- 页面标题 -->
        <view class="page-title">
            <view class="title-icon">🌺</view>
            <text class="title-text">AI 兰花识别</text>
            <text class="subtitle-text">上传图片，智能识别兰花品种</text>
        </view>

        <!-- 图片上传区域 -->
        <view class="upload-section">
            <view class="image-wrapper" @click="chooseImage" :class="{ 'has-image': imageSrc, 'uploading': isUploading }">
                <image v-if="imageSrc" :src="imageSrc" class="preview-image" mode="aspectFill"></image>
                <view v-else class="placeholder">
                    <view class="upload-icon">
                        <view class="icon-camera">📷</view>
                    </view>
                    <text class="placeholder-text">点击上传兰花图片</text>
                    <text class="placeholder-subtext">支持相册选择或相机拍摄</text>
                </view>
                <view v-if="isUploading" class="upload-overlay">
                    <view class="upload-spinner"></view>
                    <text class="upload-text">图片上传中...</text>
                </view>
            </view>
        </view>

        <!-- 识别结果卡片 -->
        <view class="result-card" v-if="result.name" :class="{ 'show': result.name }">
            <view class="card-header">
                <view class="result-badge">
                    <text class="badge-text">AI识别结果</text>
                </view>
                <view class="confidence-chip" :class="getConfidenceLevel(result.confidence)">
                    {{ getConfidenceText(result.confidence) }}
                </view>
            </view>
            
            <view class="result-content">
                <view class="species-info">
                    <view class="species-icon">🌸</view>
                    <view class="species-details">
                        <text class="species-name">{{ result.name }}</text>
                        <text class="species-latin">{{ result.latin || 'Orchidaceae Family' }}</text>
                    </view>
                </view>
                
                <view class="confidence-section">
                    <view class="confidence-label">
                        <text class="label-text">识别置信度</text>
                        <text class="confidence-value">{{ (result.confidence * 100).toFixed(1) }}%</text>
                    </view>
                    <view class="progress-container">
                        <view class="progress-track">
                            <view class="progress-fill" :style="{ width: (result.confidence * 100) + '%' }"></view>
                        </view>
                    </view>
                </view>

                <!-- 特征描述 -->
                <view class="features-section" v-if="result.features">
                    <text class="features-title">主要特征</text>
                    <view class="features-list">
                        <view class="feature-item" v-for="(feature, index) in result.features" :key="index">
                            <text class="feature-text">{{ feature }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 操作按钮区域 -->
        <view class="actions-section">
            <button class="primary-btn" @click="startRecognition" :disabled="!imageSrc || isLoading" :class="{ 'loading': isLoading }">
                <view v-if="isLoading" class="btn-loader"></view>
                <text class="btn-text">{{ isLoading ? '正在识别中...' : '开始AI识别' }}</text>
            </button>
            
            <view class="secondary-actions" v-if="imageSrc">
                <button class="secondary-btn" @click="chooseImage">
                    <text class="btn-icon">🔄</text>
                    <text class="btn-text">重新选择</text>
                </button>
                <button class="secondary-btn" @click="clearResult" v-if="result.name">
                    <text class="btn-icon">🗑️</text>
                    <text class="btn-text">清除结果</text>
                </button>
            </view>
        </view>

        <!-- 底部退出按钮 -->
        <view class="footer-section">
            <button class="logout-btn" @click="logout">
                <text class="logout-icon">👋</text>
                <text class="logout-text">退出登录</text>
            </button>
        </view>

        <!-- 浮动提示 -->
        <view class="floating-tips" v-if="!imageSrc && !result.name">
            <text class="tips-text">💡 选择清晰的兰花照片可以提高识别准确率</text>
        </view>
    </view>
</template>

// export default {
//     data() {
//         return {
//             imageSrc: '', 
//             isLoading: false,
//             isUploading: false,
//             result: {
//                 name: '',
//                 latin: '',
//                 confidence: 0,
//                 features: []
//             }
//         };
//     },
//     methods: {
//         chooseImage() {
//             this.isUploading = true;
//             uni.chooseImage({
//                 count: 1,
//                 sizeType: ['compressed'],
//                 sourceType: ['album', 'camera'],
//                 success: (res) => {
//                     setTimeout(() => {
//                         this.imageSrc = res.tempFilePaths[0];
//                         this.result = { name: '', latin: '', confidence: 0, features: [] };
//                         this.isUploading = false;
//                         uni.showToast({
//                             title: '图片上传成功',
//                             icon: 'success',
//                             duration: 1500
//                         });
//                     }, 800);
//                 },
//                 fail: () => {
//                     this.isUploading = false;
//                     uni.showToast({
//                         title: '图片选择失败',
//                         icon: 'error'
//                     });
//                 }
//             });
//         },
        
//         startRecognition() {
//             if (!this.imageSrc) {
//                 uni.showToast({ 
//                     title: '请先选择一张图片', 
//                     icon: 'none',
//                     duration: 2000
//                 });
//                 return;
//             }

//             this.isLoading = true;
//             uni.showLoading({ title: 'AI正在努力识别中...' });

//             // 模拟API调用，增强结果数据
//             setTimeout(() => {
//                 const mockResults = [
//                     {
//                         name: '春兰',
//                         latin: 'Cymbidium goeringii',
//                         confidence: 0.936,
//                         features: ['花香清雅', '叶片细长', '花期较早', '单花开放']
//                     },
//                     {
//                         name: '墨兰',
//                         latin: 'Cymbidium sinense',
//                         confidence: 0.892,
//                         features: ['花色深紫', '叶宽厚实', '花期冬季', '花序较长']
//                     },
//                     {
//                         name: '蝴蝶兰',
//                         latin: 'Phalaenopsis',
//                         confidence: 0.876,
//                         features: ['花型似蝶', '色彩丰富', '花期较长', '叶片肉质']
//                     }
//                 ];
                
//                 const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
//                 this.result = randomResult;
//                 this.isLoading = false;
//                 uni.hideLoading();
                
//                 // 成功提示
//                 uni.showToast({
//                     title: '识别完成！',
//                     icon: 'success',
//                     duration: 2000
//                 });
//             }, 2500);
//         },
        
//         clearResult() {
//             this.result = { name: '', latin: '', confidence: 0, features: [] };
//             uni.showToast({
//                 title: '结果已清除',
//                 icon: 'none',
//                 duration: 1500
//             });
//         },
        
//         logout() {
//             uni.showModal({
//                 title: '确认退出',
//                 content: '确定要退出当前账户吗？',
//                 success: (res) => {
//                     if (res.confirm) {
//                         uni.reLaunch({
//                             url: '/pages/Login'
//                         });
//                     }
//                 }
//             });
//         },
        
//         getConfidenceLevel(confidence) {
//             if (confidence >= 0.9) return 'high';
//             if (confidence >= 0.7) return 'medium';
//             return 'low';
//         },
        
//         getConfidenceText(confidence) {
//             if (confidence >= 0.9) return '高可信度';
//             if (confidence >= 0.7) return '中等可信度';
//             return '低可信度';
//         }
//     }
// };


<script>
export default {
    data() {
        return {
            imageSrc: '', 
            isLoading: false,
            isUploading: false,
            result: {
                name: '',
                latin: '',
                confidence: 0,
                features: []
            }
        };
    },
    methods: {
        chooseImage() {
            this.isUploading = true;
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    setTimeout(() => {
                        this.imageSrc = res.tempFilePaths[0];
                        this.result = { name: '', latin: '', confidence: 0, features: [] };
                        this.isUploading = false;
                        uni.showToast({
                            title: '图片上传成功',
                            icon: 'success',
                            duration: 1500
                        });
                    }, 800);
                },
                fail: () => {
                    this.isUploading = false;
                    uni.showToast({
                        title: '图片选择失败',
                        icon: 'error'
                    });
                }
            });
        },
        
        startRecognition() {
            if (!this.imageSrc) {
                uni.showToast({ 
                    title: '请先选择一张图片', 
                    icon: 'none',
                    duration: 2000
                });
                return;
            }

            this.isLoading = true;
            uni.showLoading({ title: 'AI正在努力识别中...' });

            // 调用 Flask API 进行识别
            uni.uploadFile({
                url: 'http://61.136.101.57:5000/predict', // 替换为你的 Flask API 地址
                filePath: this.imageSrc,
                name: 'file',
                success: (res) => {
                    const data = JSON.parse(res.data);
                    if (data.message === '成功') {
                        // 取置信度最高的结果
                        const topResult = data.top5_info[0];
                        this.result = {
                            name: topResult.name,
                            latin: '', // 若 API 未返回拉丁名，可留空
                            confidence: topResult.confidence,
                            features: [] // 若 API 未返回特征，可留空
                        };
                        uni.showToast({
                            title: '识别完成！',
                            icon: 'success',
                            duration: 2000
                        });
                    } else {
                        uni.showToast({
                            title: '识别失败：' + data.error,
                            icon: 'error'
                        });
                    }
                },
                fail: (err) => {
                    uni.showToast({
                        title: '请求失败：' + err.errMsg,
                        icon: 'error'
                    });
                },
                complete: () => {
                    this.isLoading = false;
                    uni.hideLoading();
                }
            });
        },
        
        clearResult() {
            this.result = { name: '', latin: '', confidence: 0, features: [] };
            uni.showToast({
                title: '结果已清除',
                icon: 'none',
                duration: 1500
            });
        },
        
        logout() {
            uni.showModal({
                title: '确认退出',
                content: '确定要退出当前账户吗？',
                success: (res) => {
                    if (res.confirm) {
                        uni.reLaunch({
                            url: '/pages/Login/Login'
                        });
                    }
                }
            });
        },
        
        getConfidenceLevel(confidence) {
            if (confidence >= 0.9) return 'high';
            if (confidence >= 0.7) return 'medium';
            return 'low';
        },
        
        getConfidenceText(confidence) {
            if (confidence >= 0.9) return '高可信度';
            if (confidence >= 0.7) return '中等可信度';
            return '低可信度';
        }
    }
};
</script>

<style scoped>
    .recognition-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px 40px;
        box-sizing: border-box;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow-x: hidden;
    }

    /* 顶部装饰 */
    .header-decoration {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        overflow: hidden;
        z-index: 0;
    }
    
    .decoration-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .circle-1 {
        width: 120px;
        height: 120px;
        top: -60px;
        right: -30px;
        animation: float 6s ease-in-out infinite;
    }
    
    .circle-2 {
        width: 80px;
        height: 80px;
        top: 50px;
        left: -20px;
        animation: float 8s ease-in-out infinite reverse;
    }
    
    .circle-3 {
        width: 200px;
        height: 200px;
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
        animation: float 10s ease-in-out infinite;
    }

    /* 页面标题 */
    .page-title {
        margin-top: 60px;
        margin-bottom: 40px;
        text-align: center;
        z-index: 1;
    }
    
    .title-icon {
        font-size: 48px;
        margin-bottom: 10px;
    }
    
    .title-text {
        display: block;
        font-size: 28px;
        font-weight: bold;
        color: white;
        margin-bottom: 8px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .subtitle-text {
        display: block;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 300;
    }

    /* 上传区域 */
    .upload-section {
        width: 100%;
        max-width: 380px;
        margin-bottom: 30px;
        z-index: 1;
    }
    
    .image-wrapper {
        width: 100%;
        height: 280px;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        overflow: hidden;
        border: 3px dashed rgba(255, 255, 255, 0.3);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .image-wrapper:active {
        transform: scale(0.98);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
    
    .image-wrapper.has-image {
        border: 3px solid rgba(102, 126, 234, 0.3);
        background: white;
    }
    
    .image-wrapper.uploading {
        border-color: #667eea;
    }
    
    .preview-image {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }
    
    .placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 20px;
    }
    
    .upload-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        animation: pulse 2s infinite;
    }
    
    .icon-camera {
        font-size: 32px;
        filter: grayscale(1) brightness(2);
    }
    
    .placeholder-text {
        color: #667eea;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    }
    
    .placeholder-subtext {
        color: #999;
        font-size: 14px;
        text-align: center;
    }
    
    .upload-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(102, 126, 234, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
        border-radius: 20px;
    }
    
    .upload-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .upload-text {
        color: white;
        font-size: 16px;
        font-weight: 500;
    }

    /* 结果卡片 */
    .result-card {
        width: 100%;
        max-width: 380px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 24px;
        margin-bottom: 30px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1;
    }
    
    .result-card.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .result-badge {
        background: linear-gradient(135deg, #667eea, #764ba2);
        padding: 8px 16px;
        border-radius: 20px;
    }
    
    .badge-text {
        color: white;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .confidence-chip {
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .confidence-chip.high {
        background: #d4edda;
        color: #155724;
    }
    
    .confidence-chip.medium {
        background: #fff3cd;
        color: #856404;
    }
    
    .confidence-chip.low {
        background: #f8d7da;
        color: #721c24;
    }
    
    .species-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
        padding: 15px;
        background: rgba(102, 126, 234, 0.05);
        border-radius: 16px;
    }
    
    .species-icon {
        font-size: 36px;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 50%;
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
    }
    
    .species-details {
        flex: 1;
    }
    
    .species-name {
        display: block;
        font-size: 22px;
        font-weight: bold;
        color: #333;
        margin-bottom: 4px;
    }
    
    .species-latin {
        display: block;
        font-size: 14px;
        color: #666;
        font-style: italic;
    }
    
    .confidence-section {
        margin-bottom: 20px;
    }
    
    .confidence-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .label-text {
        font-size: 14px;
        color: #666;
        font-weight: 500;
    }
    
    .confidence-value {
        font-size: 16px;
        font-weight: bold;
        color: #667eea;
    }
    
    .progress-container {
        position: relative;
    }
    
    .progress-track {
        width: 100%;
        height: 8px;
        background: #f0f0f0;
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        border-radius: 4px;
        transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }
    
    .progress-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s infinite;
    }
    
    .features-section {
        border-top: 1px solid #eee;
        padding-top: 20px;
    }
    
    .features-title {
        display: block;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 12px;
    }
    
    .features-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .feature-item {
        background: rgba(102, 126, 234, 0.1);
        padding: 6px 12px;
        border-radius: 12px;
    }
    
    .feature-text {
        font-size: 13px;
        color: #667eea;
        font-weight: 500;
    }

    /* 操作按钮 */
    .actions-section {
        width: 100%;
        max-width: 380px;
        margin-bottom: 30px;
        z-index: 1;
    }
    
    .primary-btn {
        width: 100%;
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: bold;
        border-radius: 28px;
        color: white;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        border: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        margin-bottom: 15px;
    }
    
    .primary-btn:active {
        transform: translateY(2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
    }
    
    .primary-btn[disabled] {
        background: linear-gradient(135deg, #ccc, #999);
        box-shadow: none;
        transform: none;
    }
    
    .primary-btn.loading {
        background: linear-gradient(135deg, #667eea, #764ba2);
        animation: pulse 2s infinite;
    }
    
    .btn-loader {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .btn-text {
        font-size: 16px;
        font-weight: 600;
    }
    
    .secondary-actions {
        display: flex;
        gap: 10px;
    }
    
    .secondary-btn {
        flex: 1;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(102, 126, 234, 0.2);
        border-radius: 24px;
        color: #667eea;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .secondary-btn:active {
        background: rgba(102, 126, 234, 0.1);
        transform: scale(0.98);
    }
    
    .btn-icon {
        font-size: 16px;
    }

    /* 底部区域 */
    .footer-section {
        width: 100%;
        max-width: 380px;
        z-index: 1;
    }
    
    .logout-btn {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 25px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .logout-btn:active {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0.98);
    }
    
    .logout-icon {
        font-size: 18px;
    }
    
    .logout-text {
        font-size: 14px;
    }

    /* 浮动提示 */
    .floating-tips {
        position: fixed;
        bottom: 120px;
        left: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 15px 20px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        z-index: 10;
        animation: slideUp 0.5s ease-out;
    }
    
    .tips-text {
        font-size: 14px;
        color: #667eea;
        text-align: center;
        line-height: 1.4;
    }

    /* 动画效果 */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes slideUp {
        0% {
            transform: translateY(100%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>
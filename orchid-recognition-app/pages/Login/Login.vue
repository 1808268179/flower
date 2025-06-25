<template>
    <view class="login-container">
        <!-- 背景装饰 -->
        <view class="bg-decoration">
            <view class="floating-orchid orchid-1"></view>
            <view class="floating-orchid orchid-2"></view>
            <view class="floating-orchid orchid-3"></view>
        </view>
        
        <view class="content-wrapper">
            <view class="logo-wrapper">
                <!-- 精美的兰花Logo -->
                <view class="logo-container">
                    <image class="logo" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBldGFsR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY2Qjk1O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNDNzU5RjA7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsZWFmR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDBFMEQwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzOEJERjg7c2lvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8IS0tIE9yY2hpZCBQZXRhbCAtLT4KICA8ZWxsaXBzZSBjeD0iNTAiIGN5PSIzMCIgcng9IjE1IiByeT0iMjAiIGZpbGw9InVybCgjcGV0YWxHcmFkaWVudCkiIHRyYW5zZm9ybT0icm90YXRlKDEwIDUwIDMwKSIvPgogIDxlbGxpcHNlIGN4PSI3MCIgY3k9IjQwIiByeD0iMTIiIHJ5PSIxOCIgZmlsbD0idXJsKCNwZXRhbEdyYWRpZW50KSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNzAgNDApIi8+CiAgPGVsbGlwc2UgY3g9IjMwIiBjeT0iNDAiIHJ4PSIxMiIgcnk9IjE4IiBmaWxsPSJ1cmwoI3BldGFsR3JhZGllbnQpIiB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgMzAgNDApIi8+CiAgPGVsbGlwc2UgY3g9IjUwIiBjeT0iNjUiIHJ4PSIyMCIgcnk9IjE1IiBmaWxsPSJ1cmwoI3BldGFsR3JhZGllbnQpIiB0cmFuc2Zvcm09InJvdGF0ZSgwIDUwIDY1KSIvPgogIDwhLS0gU3RlbSAtLT4KICA8cmVjdCB4PSI0OCIgeT0iNzAiIHdpZHRoPSI0IiBoZWlnaHQ9IjI1IiBmaWxsPSJ1cmwoI2xlYWZHcmFkaWVudCkiIHJ4PSIyIi8+CiAgPCEtLSBMZWF2ZXMgLS0+CiAgPGVsbGlwc2UgY3g9IjM1IiBjeT0iODAiIHJ4PSI4IiByeT0iMTIiIGZpbGw9InVybCgjbGVhZkdyYWRpZW50KSIgdHJhbnNmb3JtPSJyb3RhdGUoLTMwIDM1IDgwKSIvPgogIDxlbGxpcHNlIGN4PSI2NSIgY3k9IjgwIiByeD0iOCIgcnk9IjEyIiBmaWxsPSJ1cmwoI2xlYWZHcmFkaWVudCkiIHRyYW5zZm9ybT0icm90YXRlKDMwIDY1IDgwKSIvPgo8L3N2Zz4="/>
                    <view class="logo-shine"></view>
                </view>
                <view class="title">兰花识别专家</view>
                <view class="subtitle">AI 驱动的智能花卉识别</view>
            </view>
            
            <view class="form">
                <view class="input-wrapper">
                    <view class="input-icon">👤</view>
                    <input class="input-item" type="text" v-model="username" placeholder="请输入用户名" />
                </view>
                <view class="input-wrapper">
                    <view class="input-icon">🔒</view>
                    <input class="input-item" type="password" v-model="password" placeholder="请输入密码" />
                </view>
                <button class="login-btn" @click="login" :disabled="isLoading">
                    <view v-if="isLoading" class="loading-spinner"></view>
                    <text>{{ isLoading ? '登录中...' : '立即登录' }}</text>
                    <view class="btn-glow"></view>
                </button>
            </view>
            
            <view class="tips">
                <view class="tip-icon">💡</view>
                <text>演示模式：输入任意内容即可体验</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                isLoading: false
            };
        },
        methods: {
            login() {
                if (!this.username || !this.password) {
                    uni.showToast({
                        title: '用户名或密码不能为空',
                        icon: 'none'
                    });
                    return;
                }
                
                this.isLoading = true;
                console.log('正在进行登录验证...');
                
                uni.showLoading({
                    title: '登录中...'
                });
                
                setTimeout(() => {
                    this.isLoading = false;
                    uni.hideLoading();
                    uni.reLaunch({
                        url: '/pages/Home/Home'
                    });
                }, 1500);
            }
        }
    };
</script>

<style scoped>
    .login-container {
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        overflow: hidden;
    }
    
    .bg-decoration {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    
    .floating-orchid {
        position: absolute;
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        backdrop-filter: blur(10px);
        animation: float 6s ease-in-out infinite;
    }
    
    .orchid-1 {
        top: 10%;
        left: 15%;
        animation-delay: 0s;
    }
    
    .orchid-2 {
        top: 70%;
        right: 20%;
        animation-delay: 2s;
    }
    
    .orchid-3 {
        top: 40%;
        left: 10%;
        animation-delay: 4s;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .content-wrapper {
        width: 90%;
        max-width: 400px;
        padding: 40px 30px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 30px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .logo-wrapper {
        text-align: center;
        margin-bottom: 40px;
    }
    
    .logo-container {
        position: relative;
        display: inline-block;
        margin-bottom: 20px;
    }
    
    .logo {
        width: 100px;
        height: 100px;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .logo-shine {
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        border-radius: 50%;
        animation: shine 3s linear infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes shine {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .title {
        font-size: 28px;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 8px;
        letter-spacing: 0.5px;
    }
    
    .subtitle {
        font-size: 14px;
        color: #7f8c8d;
        font-weight: 400;
    }
    
    .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .input-icon {
        position: absolute;
        left: 20px;
        z-index: 2;
        font-size: 18px;
    }
    
    .input-item {
        width: 100%;
        height: 56px;
        padding: 0 20px 0 55px;
        border: 2px solid rgba(108, 92, 231, 0.1);
        border-radius: 16px;
        font-size: 16px;
        background: rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
        box-sizing: border-box;
    }
    
    .input-item:focus {
        outline: none;
        border-color: #667eea;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        transform: translateY(-2px);
    }
    
    .login-btn {
        position: relative;
        width: 100%;
        height: 56px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 16px;
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s ease;
        overflow: hidden;
        margin-top: 10px;
    }
    
    .login-btn:not([disabled]):active {
        transform: translateY(1px);
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
    }
    
    .login-btn[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .btn-glow {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transform: rotate(45deg);
        animation: glow 2s linear infinite;
    }
    
    @keyframes glow {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .tips {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 15px;
        background: rgba(52, 152, 219, 0.1);
        border-radius: 12px;
        border-left: 4px solid #3498db;
    }
    
    .tip-icon {
        font-size: 16px;
    }
    
    .tips text {
        font-size: 13px;
        color: #5a6c7d;
        line-height: 1.4;
    }
</style>
import { useUserStore } from "../store/storage";

const AppPage = () => {
    const userInfo = useUserStore((state) => state.userInfo);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const setUserInfo = useUserStore((state) => state.setUserInfo);
    const logout = useUserStore((state) => state.logout);

    const isLogin = isLoggedIn && userInfo;
    
    const handleLogin = () => {
        // 模拟登录，设置用户信息
        const mockUserInfo = {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://i.pravatar.cc/150?img=2",
            role: "user"
        };  
        setUserInfo(mockUserInfo);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex justify-around flex-col md:flex-row items-center p-4 text-gray-800">
            {/* 卡片容器 */}
            <div className="w-full max-w-xs border border-gray-300 bg-gray-100">
                {/* 卡片主题内容 */}
                <div className="flex flex-col h-120 items-center p-8">
                    {isLogin ? (<MainPage />) : (<LoginPage />)}
                </div>
                {/* 卡片底部操作按钮 */}
                <div className="px-8 py-6 border-t border-gray-300">
                    {isLogin ? (
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full">
                            退出登录
                        </button>
                    ):(<button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">
                        模拟登录
                    </button>)}
                </div>
                {/* Debug 区域 (展示 LocalStorage 中的数据) */}
                <div className="mt-8 w-full max-w-xs">
                    <div className="bg-gray-800 p-4 text-xs font-mono text-green-400 overflow-x-auto shadow-inner">
                        <p className="text-gray-500 mb-2 font-bold select-none">// LocalStorage Monitor:</p>
                        <pre>{JSON.stringify(localStorage, null, 2)}</pre>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AppPage;


function MainPage() {
    const userInfo = useUserStore((state) => state.userInfo);
    return (
        <>
          <div className="relative">
            <img 
            src={userInfo?.avatar} 
            alt={userInfo?.name} 
            className="size-24 rounded-full border-4 border-blue-50 shadow-md object-cover mb-4"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 size-4 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2">{userInfo?.name}</h2>
          <p className="text-gray-600 mb-4">{userInfo?.email}</p>
          {/* 徽章 */}
          <div className="bg-indigo-50 text-indigo-700 px-4 py-1 text-xs font-bold uppercase tracking-wide border border-indigo-100">
            {userInfo?.role}
          </div>
          {/* 额外信息 */}
          <div className="mt-6 flex gap-6 text-sm text-gray-400">
            <div className="flex flex-col items-center">
                <span className="font-bold text-gray-800 text-lg">
                    128
                </span>
                <span>
                    获赞
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-gray-800 text-lg">42</span>
                <span>项目</span>
            </div>
          </div>
        </>
    )
}
function LoginPage() {
    return (
        <>
          <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">欢迎回来</h2>
          <p className="text-center text-gray-500 mt-2 text-sm leading-relaxed px-4">
            请登录以继续访问您的账户和个性化内容。
          </p>
        </>
    )
}
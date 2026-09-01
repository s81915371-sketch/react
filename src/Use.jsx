import React, { useState, useEffect } from 'react';

export default function Use() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('reactjs');
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const [likes, setLikes] = useState(5.9);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const fetchVideos = async (query) => {
    setLoading(true);
    const url = `https://youtube-v31.p.rapidapi.com/search?q=${encodeURIComponent(query)}&part=id%2Csnippet&type=video&maxResults=16`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9bb1283d2emsh2c249f2a531e833p1c4869jsn066a81477082',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.items) setVideos(data.items);
    } catch (error) {
      console.error('Xatolik:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(searchTerm); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSelectedVideo(null);
      fetchVideos(searchTerm);
    }
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleLike = () => {
    if (!liked) {
      setLikes((prev) => +(prev + 0.1).toFixed(1));
      setLiked(true);
      if (disliked) setDisliked(false);
    } else {
      setLikes((prev) => +(prev - 0.1).toFixed(1));
      setLiked(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '56px', backgroundColor: '#0f0f0f', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg style={{ cursor: 'pointer', fill: '#fff' }} height="24" viewBox="0 0 24 24" width="24"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
          <div onClick={() => setSelectedVideo(null)} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <svg height="20" viewBox="0 0 90 20" width="90"><path d="M27.9727 3.12324C27.6435 1.89339 26.6765 0.926423 25.4466 0.597168C23.2197 0 14.2857 0 14.2857 0C14.2857 0 5.35174 0 3.12481 0.597168C1.89496 0.926423 0.927993 1.89339 0.598738 3.12324C0 5.35018 0 10 0 10C0 10 0 14.6498 0.598738 16.8768C0.927993 18.1066 1.89496 19.0736 3.12481 19.4028C5.35174 20 14.2857 20 14.2857 20C14.2857 20 23.2197 20 25.4466 19.4028C26.6765 19.0736 27.6435 18.1066 27.9727 16.8768C28.5714 14.6498 28.5714 10 28.5714 10C28.5714 10 28.5714 5.35018 27.9727 3.12324Z" fill="#FF0000"></path><path d="M11.4286 14.2857L18.8571 10L11.4286 5.71429V14.2857Z" fill="#FFFFFF"></path></svg>
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', width: '40%', maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="Qidiruv"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', backgroundColor: '#121212', border: '1px solid #303030', padding: '8px 16px', borderTopLeftRadius: '40px', borderBottomLeftRadius: '40px', outline: 'none', color: '#fff', fontSize: '16px' }}
          />
          <button type="submit" style={{ backgroundColor: '#222', border: '1px solid #303030', borderLeft: 'none', padding: '8px 20px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px', cursor: 'pointer', color: '#fff', fontSize: '16px' }}>
            🔍
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{ backgroundColor: '#222', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '500' }}>+ Yaratish</button>
          <svg style={{ cursor: 'pointer', fill: '#fff' }} height="24" viewBox="0 0 24 24" width="24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path></svg>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: '72px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '56px', height: 'calc(100vh - 56px)' }}>
          <div onClick={() => setSelectedVideo(null)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', gap: '6px', cursor: 'pointer', padding: '10px 0', borderRadius: '8px' }}>
            <svg style={{ fill: '#fff' }} height="24" viewBox="0 0 24 24" width="24"><path d="M4 21V10l8-7 8 7v11h-6v-6h-4v6H4z"></path></svg> Asosiy
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', gap: '6px', cursor: 'pointer', padding: '10px 0', borderRadius: '8px' }}>
            <svg style={{ fill: '#fff' }} height="24" viewBox="0 0 24 24" width="24"><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.23-2.53-5.06-1.56L5.38 8.07c-1.57.82-2.36 2.58-1.94 4.25.42 1.67 1.83 2.94 3.53 3.12l1.2.12-1.48.92c-1.84.96-2.53 3.23-1.56 5.06.96 1.84 3.23 2.53 5.06 1.56l9.12-4.63c1.57-.82 2.36-2.58 1.94-4.25-.42-1.67-1.83-2.94-3.53-3.12z"></path></svg> Shorts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', gap: '6px', cursor: 'pointer', padding: '10px 0', borderRadius: '8px' }}>
            <svg style={{ fill: '#fff' }} height="24" viewBox="0 0 24 24" width="24"><path d="M20 7H4V6h16v1zm2 2H2v12h20V9zM4 11h16v8H4v-8z"></path></svg> Obunalar
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '10px', gap: '6px', cursor: 'pointer', padding: '10px 0', borderRadius: '8px' }}>
            <svg style={{ fill: '#fff' }} height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5 .88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"></path></svg> Siz
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '24px' }}>
          {selectedVideo ? (
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <div style={{ width: 'calc(100% - 390px)', maxWidth: '980px', display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
                    title={selectedVideo.snippet.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0, lineHeight: '24px' }}>
                  {decodeHtml(selectedVideo.snippet.title)}
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={selectedVideo.snippet.thumbnails.default.url} 
                      alt="Channel avatar" 
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#fff' }}>{selectedVideo.snippet.channelTitle}</h4>
                      <span style={{ fontSize: '11px', color: '#aaa' }}>161 ming obunachi</span>
                    </div>
                    <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '8px' }}>
                      Obuna
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {/* Like & Dislike Group */}
                    <div style={{ display: 'flex', backgroundColor: '#272727', borderRadius: '20px', overflow: 'hidden', alignItems: 'center' }}>
                      <button onClick={handleLike} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <svg style={{ fill: liked ? '#3ea6ff' : '#fff' }} height="20" viewBox="0 0 24 24" width="20"><path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4.23l8.03 2.15c.67.18 1.37-.1 1.68-.73l2.84-6.84c.33-.8-.11-1.72-.94-2.03zM6 12h-1v8h1v-8zm12.31 1.77L15.46 20.6c-.16.38-.54.63-.96.63H8v-9.15l5.86-6.38c.2-.22.5-.35.8-.35.39 0 .7.31.7.7l-1.42 4.61-.41 1.34h4.97c.55 0 1 .45 1 1 0 .22-.08.44-.22.61z"></path></svg>
                        {likes} ming
                      </button>
                      <div style={{ width: '1px', height: '16px', backgroundColor: '#3f3f46' }}></div>
                      <button onClick={() => setDisliked(!disliked)} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <svg style={{ fill: disliked ? '#3ea6ff' : '#fff', transform: 'rotate(180deg)' }} height="20" viewBox="0 0 24 24" width="20"><path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4.23l8.03 2.15c.67.18 1.37-.1 1.68-.73l2.84-6.84c.33-.8-.11-1.72-.94-2.03zM6 12h-1v8h1v-8zm12.31 1.77L15.46 20.6c-.16.38-.54.63-.96.63H8v-9.15l5.86-6.38c.2-.22.5-.35.8-.35.39 0 .7.31.7.7l-1.42 4.61-.41 1.34h4.97c.55 0 1 .45 1 1 0 .22-.08.44-.22.61z"></path></svg>
                      </button>
                    </div>

                    <button style={{ backgroundColor: '#272727', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg style={{ fill: '#fff' }} height="18" viewBox="0 0 24 24" width="18"><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.97 0-7.14 1.05-9.5 3.12 1.14-5.02 4.17-10.12 10.5-10.12h1v-1.37zM14 3v3C6.71 6 3 11.5 2 17c3.15-4.25 7.07-5 12-5v3l7-7-7-7z"></path></svg> Ulashish
                    </button>
                    <button style={{ backgroundColor: '#272727', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                      💾 Saqlash
                    </button>
                    <button onClick={() => setSelectedVideo(null)} style={{ backgroundColor: '#272727', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                      Orqaga
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ width: '380px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Hammasi
                  </button>
                  <button style={{ backgroundColor: '#272727', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>
                    Manba: {selectedVideo.snippet.channelTitle}
                  </button>
                </div>

                {videos.map((video) => {
                  if (!video.id.videoId || video.id.videoId === selectedVideo.id.videoId) return null;
                  return (
                    <div 
                      key={video.id.videoId} 
                      onClick={() => setSelectedVideo(video)}
                      style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        style={{ width: '168px', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#27272a', flexShrink: 0 }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 500, margin: '0 0 4px 0', color: '#f1f1f1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '18px' }}>
                          {decodeHtml(video.snippet.title)}
                        </h4>
                        <span style={{ fontSize: '11px', color: '#aaa' }}>{video.snippet.channelTitle}</span>
                        <span style={{ fontSize: '11px', color: '#aaa' }}>1,6 ming ko'rish · 2 soat oldin</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
                {['Hammasi', 'Gaming', 'Jonli', 'Musiqa', 'Mixslar', 'Dasturlash', 'Animatsiyalar', 'Futbol'].map((cat, idx) => (
                  <button key={idx} onClick={() => { setSearchTerm(cat); fetchVideos(cat); }} style={{ backgroundColor: searchTerm === cat ? '#fff' : '#272727', color: searchTerm === cat ? '#000' : '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap', fontWeight: '500' }}>
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <p style={{ textAlign: 'center', color: '#aaa' }}>Yuklanmoqda...</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {videos.map((video) => {
                    if (!video.id.videoId) return null;
                    return (
                      <div 
                        key={video.id.videoId} 
                        onClick={() => setSelectedVideo(video)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}
                      >
                        <img
                          src={video.snippet.thumbnails.high.url}
                          alt={video.snippet.title}
                          style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '12px', backgroundColor: '#27272a' }}
                        />
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <img 
                            src={video.snippet.thumbnails.default.url} 
                            alt="Channel" 
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
                          />
                          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 500, margin: '0 0 4px 0', color: '#f1f1f1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '20px' }}>
                              {decodeHtml(video.snippet.title)}
                            </h4>
                            <span style={{ fontSize: '12px', color: '#aaa' }}>{video.snippet.channelTitle}</span>
                            <span style={{ fontSize: '12px', color: '#aaa' }}>
                              {new Date(video.snippet.publishTime).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
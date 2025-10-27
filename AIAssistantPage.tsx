import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, Modality, Type, LiveServerMessage, Blob, Operation, VideosOperationResponse, FunctionDeclaration } from '@google/genai';
import { fileToBase64, decode, encode, decodeAudioData } from '../utils/helpers';
import { AITool } from '../types';
import type { ChatMessage } from '../types';

// Helper components defined within the same file to keep it self-contained

const ToolSelector: React.FC<{ selectedTool: AITool; onSelectTool: (tool: AITool) => void }> = ({ selectedTool, onSelectTool }) => {
    const tools = Object.values(AITool);
    return (
        <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                {tools.map(tool => (
                    <button
                        key={tool}
                        onClick={() => onSelectTool(tool)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                            selectedTool === tool ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {tool}
                    </button>
                ))}
            </div>
        </div>
    );
};

const LoadingSpinner: React.FC<{text?: string}> = ({text = "Thinking..."}) => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg">
        <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-300">{text}</p>
    </div>
);

const FileInput: React.FC<{ id: string; label: string; accept: string; onChange: (file: File | null) => void; className?: string }> = ({ id, label, accept, onChange, className }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input
            id={id}
            type="file"
            accept={accept}
            onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
        />
    </div>
);

const PromptInput: React.FC<{ value: string; onChange: (value: string) => void; placeholder: string; disabled?: boolean; }> = ({ value, onChange, placeholder, disabled }) => (
    <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
        rows={3}
    />
);


// Main Page Component
export const AIAssistantPage: React.FC<{initialPrompt?: string}> = ({initialPrompt}) => {
    const [selectedTool, setSelectedTool] = useState<AITool>(AITool.Tutor);

    const renderTool = () => {
        switch (selectedTool) {
            case AITool.Tutor: return <AITutorChat initialPrompt={initialPrompt} />;
            case AITool.QuickChat: return <QuickChat />;
            case AITool.ImageStudio: return <ImageStudio />;
            case AITool.VideoStudio: return <VideoStudio />;
            case AITool.ContentAnalyzer: return <ContentAnalyzer />;
            case AITool.GroundedSearch: return <GroundedSearch />;
            case AITool.LiveConversation: return <LiveConversation />;
            case AITool.TextToSpeech: return <TextToSpeech />;
            case AITool.ComplexQuery: return <ComplexQuerySolver />;
            default: return <AITutorChat />;
        }
    };

    return (
        <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
            <p className="text-gray-400 mb-6">Your personal AI-powered learning and creation companion.</p>
            <ToolSelector selectedTool={selectedTool} onSelectTool={setSelectedTool} />
            <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6">
                {renderTool()}
            </div>
        </div>
    );
};


// Individual AI Tool Components

const AITutorChat: React.FC<{initialPrompt?: string}> = ({initialPrompt}) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const isInitialPromptSent = useRef(false);
    
    const handleSend = useCallback(async (messageToSend: string) => {
        if (!messageToSend.trim() || !chat || loading) return;
        
        const userMessage: ChatMessage = { role: 'user', parts: [{ text: messageToSend }] };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setPrompt('');

        try {
            const result = await chat.sendMessage({ message: messageToSend });
            const modelMessage: ChatMessage = { role: 'model', parts: [{ text: result.text }] };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Sorry, I encountered an error. Please try again." }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }, [chat, loading]);
    
    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are Edu-Connect\'s friendly and helpful AI Tutor. You explain concepts clearly and encourage students.',
          },
        });
        setChat(newChat);
    }, []);

    useEffect(() => {
        if (initialPrompt && chat && !isInitialPromptSent.current) {
            isInitialPromptSent.current = true;
            handleSend(initialPrompt);
        }
    }, [initialPrompt, chat, handleSend]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <div className="flex flex-col h-[65vh]">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.length === 0 && <div className="text-center text-gray-400 p-4">Ask me anything to get started!</div>}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                            <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-gray-700 text-gray-200">
                           <LoadingSpinner text="Answering..." />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex space-x-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(prompt)}
                    placeholder="Ask your AI Tutor..."
                    className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={loading}
                />
                <button onClick={() => handleSend(prompt)} disabled={loading || !prompt.trim()} className="px-6 py-2 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
                    Send
                </button>
            </div>
        </div>
    );
};

const QuickChat: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = useCallback(async () => {
        if (!prompt.trim() || !chat || loading) return;

        const userMessage: ChatMessage = { role: 'user', parts: [{ text: prompt }] };
        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        const messageToSend = prompt;
        setPrompt('');

        try {
            const result = await chat.sendMessage({ message: messageToSend });
            const modelMessage: ChatMessage = { role: 'model', parts: [{ text: result.text }] };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Sorry, I encountered an error. Please try again." }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }, [chat, loading, prompt]);

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash-lite',
            config: {
                systemInstruction: "You are Edu-Connect's quick assistant. Provide fast, concise answers. Prioritize speed and brevity.",
            },
        });
        setChat(newChat);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-[65vh]">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                {messages.length === 0 && <div className="text-center text-gray-400 p-4">Need a fast answer? I'm here to help!</div>}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                            <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-gray-700 text-gray-200">
                           <LoadingSpinner text="Answering..." />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex space-x-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask a quick question..."
                    className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={loading}
                />
                <button onClick={handleSend} disabled={loading || !prompt.trim()} className="px-6 py-2 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
                    Send
                </button>
            </div>
        </div>
    );
};


const ImageStudio: React.FC = () => {
    const [mode, setMode] = useState<'generate' | 'edit'>('generate');
    const [prompt, setPrompt] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultImage, setResultImage] = useState('');

    const handleGenerate = async () => {
        if (!prompt.trim() || loading) return;
        if (mode === 'edit' && !imageFile) {
            setError('Please upload an image to edit.');
            return;
        }
        setLoading(true);
        setError('');
        setResultImage('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            if (mode === 'generate') {
                const response = await ai.models.generateImages({
                    model: 'imagen-4.0-generate-001',
                    prompt,
                    config: { numberOfImages: 1, aspectRatio },
                });
                const base64Image = response.generatedImages[0].image.imageBytes;
                setResultImage(`data:image/png;base64,${base64Image}`);
            } else { // Edit mode
                const base64Data = await fileToBase64(imageFile!);
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: {
                        parts: [
                            { inlineData: { data: base64Data, mimeType: imageFile!.type } },
                            { text: prompt },
                        ],
                    },
                    config: { responseModalities: [Modality.IMAGE] },
                });
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        setResultImage(`data:image/png;base64,${part.inlineData.data}`);
                        break;
                    }
                }
            }
        } catch (e) {
            console.error(e);
            setError('Failed to generate image. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <div className="flex bg-gray-700 rounded-lg p-1">
                <button onClick={() => setMode('generate')} className={`w-1/2 p-2 rounded-md font-semibold ${mode === 'generate' ? 'bg-indigo-600' : ''}`}>Generate</button>
                <button onClick={() => setMode('edit')} className={`w-1/2 p-2 rounded-md font-semibold ${mode === 'edit' ? 'bg-indigo-600' : ''}`}>Edit</button>
            </div>

            {mode === 'edit' && <FileInput id="img-edit" label="Upload Image" accept="image/*" onChange={setImageFile} />}
            <PromptInput value={prompt} onChange={setPrompt} placeholder={mode === 'generate' ? 'e.g., A futuristic classroom on Mars...' : 'e.g., Add a retro filter...'} />
            
            {mode === 'generate' && (
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                    <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as '1:1')} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg">
                        <option value="1:1">1:1 (Square)</option>
                        <option value="16:9">16:9 (Landscape)</option>
                        <option value="9:16">9:16 (Portrait)</option>
                    </select>
                </div>
            )}
            
            <button onClick={handleGenerate} disabled={loading} className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600">
                {loading ? 'Generating...' : mode === 'generate' ? 'Generate Image' : 'Edit Image'}
            </button>
            
            {error && <p className="text-red-400">{error}</p>}
            
            {loading && <LoadingSpinner />}
            {resultImage && (
                <div>
                    <h3 className="font-bold mb-2">Result:</h3>
                    <img src={resultImage} alt="Generated result" className="rounded-lg w-full" />
                </div>
            )}
        </div>
    );
};

const VideoStudio: React.FC = () => {
    const [mode, setMode] = useState<'text' | 'image'>('text');
    const [prompt, setPrompt] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Initializing...');
    const [error, setError] = useState('');
    const [resultVideoUrl, setResultVideoUrl] = useState('');
    const [hasApiKey, setHasApiKey] = useState(false);

    const checkApiKey = useCallback(async () => {
        try {
            const selected = await (window as any).aistudio.hasSelectedApiKey();
            setHasApiKey(selected);
        } catch (e) {
            console.warn('aistudio API not available');
            setHasApiKey(true); // Assume true if check fails in dev env
        }
    }, []);

    useEffect(() => {
        checkApiKey();
    }, [checkApiKey]);

    const handleSelectKey = async () => {
        try {
            await (window as any).aistudio.openSelectKey();
            setHasApiKey(true); // Assume selection is successful
        } catch (e) {
            console.error("Failed to open API key selector", e);
        }
    };
    
    const handleGenerate = async () => {
        if (!prompt.trim() && mode === 'text') {
            setError('Please enter a prompt.');
            return;
        }
        if (mode === 'image' && !imageFile) {
            setError('Please upload an image.');
            return;
        }

        await checkApiKey();
        if(!hasApiKey) {
            handleSelectKey();
            return;
        }

        setLoading(true);
        setError('');
        setResultVideoUrl('');
        
        const messages = [
            'Warming up the digital film crew...',
            'Scouting virtual locations...',
            'Casting pixel-perfect actors...',
            'Rendering the first frames...',
            'Adding special effects...',
            'This is taking a moment, greatness is coming!',
        ];
        let messageIndex = 0;
        setLoadingMessage(messages[messageIndex]);
        const messageInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setLoadingMessage(messages[messageIndex]);
        }, 8000);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            let operation: Operation<unknown, VideosOperationResponse>;
            
            const config = {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio,
            };

            if (mode === 'image') {
                const base64Data = await fileToBase64(imageFile!);
                operation = await ai.models.generateVideos({
                    model: 'veo-3.1-fast-generate-preview',
                    prompt,
                    image: { imageBytes: base64Data, mimeType: imageFile!.type },
                    config,
                });
            } else {
                operation = await ai.models.generateVideos({
                    model: 'veo-3.1-fast-generate-preview',
                    prompt,
                    config,
                });
            }

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation });
            }

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                 const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                 const blob = await response.blob();
                 setResultVideoUrl(URL.createObjectURL(blob));
            } else {
                throw new Error('Video generation did not return a valid link.');
            }
        } catch (e: any) {
             console.error(e);
             let errorMessage = 'Failed to generate video. Please try again.';
             if (e.message && e.message.includes("Requested entity was not found")) {
                errorMessage = "API Key not valid. Please select a valid key.";
                setHasApiKey(false);
             }
             setError(errorMessage);
        } finally {
            setLoading(false);
            clearInterval(messageInterval);
        }
    };
    
    if (!hasApiKey) {
        return (
            <div className="text-center p-4">
                <h3 className="font-bold text-lg">API Key Required</h3>
                <p className="text-gray-400 my-2">Video generation requires a valid API key from a project with billing enabled.</p>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Learn about billing</a>
                <button onClick={handleSelectKey} className="mt-4 w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700">Select API Key</button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex bg-gray-700 rounded-lg p-1">
                <button onClick={() => setMode('text')} className={`w-1/2 p-2 rounded-md font-semibold ${mode === 'text' ? 'bg-indigo-600' : ''}`}>Text-to-Video</button>
                <button onClick={() => setMode('image')} className={`w-1/2 p-2 rounded-md font-semibold ${mode === 'image' ? 'bg-indigo-600' : ''}`}>Image-to-Video</button>
            </div>
            
            {mode === 'image' && <FileInput id="vid-img" label="Upload Starting Image" accept="image/*" onChange={setImageFile} />}
            <PromptInput value={prompt} onChange={setPrompt} placeholder={mode==='text' ? "e.g., A golden retriever surfing a giant wave..." : "e.g., Make this scene snowy..."} />
            
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
                <select value={aspectRatio} onChange={e => setAspectRatio(e.target.value as '16:9')} className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg">
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Portrait)</option>
                </select>
            </div>
            
            <button onClick={handleGenerate} disabled={loading} className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600">
                {loading ? 'Generating Video...' : 'Generate Video'}
            </button>
            
            {error && <p className="text-red-400">{error}</p>}
            
            {loading && <LoadingSpinner text={loadingMessage} />}
            {resultVideoUrl && (
                <div>
                    <h3 className="font-bold mb-2">Result:</h3>
                    <video src={resultVideoUrl} controls className="rounded-lg w-full"></video>
                </div>
            )}
        </div>
    );
};

const ContentAnalyzer: React.FC = () => {
    const [mode, setMode] = useState<'image' | 'video' | 'audio'>('image');
    const [file, setFile] = useState<File | null>(null);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    
    const handleAnalyze = async () => {
        if(!file) { setError('Please upload a file.'); return; }
        if(!prompt.trim()) { setError('Please enter a prompt.'); return; }
        setLoading(true);
        setError('');
        setResult('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const base64Data = await fileToBase64(file);
            const model = mode === 'video' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
            
            const response = await ai.models.generateContent({
                model,
                contents: {
                    parts: [
                        { inlineData: { data: base64Data, mimeType: file.type } },
                        { text: prompt },
                    ]
                },
            });
            setResult(response.text);

        } catch (e) {
            console.error(e);
            setError('Failed to analyze content.');
        } finally {
            setLoading(false);
        }
    };
    
    const acceptType = mode === 'image' ? 'image/*' : mode === 'video' ? 'video/*' : 'audio/*';
    const defaultPrompt = mode === 'image' ? 'Describe this image in detail.' : mode === 'video' ? 'Summarize this video.' : 'Transcribe this audio.';
    
    return (
        <div className="space-y-4">
             <div className="flex bg-gray-700 rounded-lg p-1">
                <button onClick={() => setMode('image')} className={`w-1/3 p-2 rounded-md font-semibold ${mode === 'image' ? 'bg-indigo-600' : ''}`}>Image</button>
                <button onClick={() => setMode('video')} className={`w-1/3 p-2 rounded-md font-semibold ${mode === 'video' ? 'bg-indigo-600' : ''}`}>Video</button>
                <button onClick={() => setMode('audio')} className={`w-1/3 p-2 rounded-md font-semibold ${mode === 'audio' ? 'bg-indigo-600' : ''}`}>Audio</button>
            </div>
            <FileInput id="analyzer-file" label={`Upload ${mode}`} accept={acceptType} onChange={setFile} />
            <PromptInput value={prompt} onChange={setPrompt} placeholder={defaultPrompt} />
            <button onClick={handleAnalyze} disabled={loading} className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600">
                {loading ? 'Analyzing...' : `Analyze ${mode}`}
            </button>
            {error && <p className="text-red-400">{error}</p>}
            {loading && <LoadingSpinner />}
            {result && (
                <div>
                    <h3 className="font-bold mb-2">Analysis Result:</h3>
                    <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-gray-300">{result}</div>
                </div>
            )}
        </div>
    );
};

const GroundedSearch: React.FC = () => {
    const [mode, setMode] = useState<'search' | 'maps'>('search');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<GenerateContentResponse | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if(!query.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const tools = mode === 'search' ? [{ googleSearch: {} }] : [{ googleMaps: {} }];
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: query,
                config: { tools }
            });
            setResult(response);
        } catch (e) {
            console.error(e);
            setError("Failed to perform search.");
        } finally {
            setLoading(false);
        }
    };
    
    const groundingChunks = result?.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    return (
        <div className="space-y-4">
            <div className="flex bg-gray-700 rounded-lg p-1">
                <button onClick={() => setMode('search')} className={`w-1/2 p-2 rounded-md font-semibold ${mode === 'search' ? 'bg-indigo-600' : ''}`}>Web Search</button>
                <button onClick={() => setMode('maps')} className={`w-1/2 p-2 rounded-md font-semibold ${mode === 'maps' ? 'bg-indigo-600' : ''}`}>Maps Search</button>
            </div>
            <PromptInput value={query} onChange={setQuery} placeholder={mode === 'search' ? "e.g., Latest news on AI education..." : "e.g., Best libraries near me..."} />
            <button onClick={handleSearch} disabled={loading} className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600">
                {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <p className="text-red-400">{error}</p>}
            {loading && <LoadingSpinner />}
            {result && (
                <div>
                    <h3 className="font-bold mb-2">Search Result:</h3>
                    <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-gray-300 mb-4">{result.text}</div>
                    {groundingChunks && groundingChunks.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2">Sources:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {groundingChunks.map((chunk, i) => {
                                    const source = chunk.web || chunk.maps;
                                    return source?.uri ? <li key={i}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">{source.title}</a></li> : null;
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const LiveConversation: React.FC = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [transcripts, setTranscripts] = useState<{user: string, model: string}[]>([]);
    const sessionRef = useRef<any>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopConversation = useCallback(() => {
        if (sessionRef.current) {
            sessionRef.current.close();
            sessionRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
         if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            outputAudioContextRef.current.close();
        }
        setIsSessionActive(false);
        setStatus('Idle');
    }, []);

    const startConversation = async () => {
        if (isSessionActive) return;
        setStatus('Initializing...');
        
        let currentInputTranscription = '';
        let currentOutputTranscription = '';
        let nextStartTime = 0;
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextRef.current = inputAudioContext;
            
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            outputAudioContextRef.current = outputAudioContext;

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                    systemInstruction: 'You are a friendly and helpful AI from Edu-Connect. Keep your responses concise.',
                },
                callbacks: {
                    onopen: () => {
                        setStatus('Connected. Start speaking!');
                        setIsSessionActive(true);
                        const source = inputAudioContext.createMediaStreamSource(stream);
                        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }
                            const pcmBlob: Blob = {
                                data: encode(new Uint8Array(int16.buffer)),
                                mimeType: 'audio/pcm;rate=16000',
                            };
                            sessionPromise.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscription += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscription += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.turnComplete) {
                            setTranscripts(prev => [...prev, {user: currentInputTranscription, model: currentOutputTranscription}]);
                            currentInputTranscription = '';
                            currentOutputTranscription = '';
                        }
                        
                        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
                        if(audioData) {
                             nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                             const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
                             const source = outputAudioContext.createBufferSource();
                             source.buffer = audioBuffer;
                             source.connect(outputAudioContext.destination);
                             source.start(nextStartTime);
                             nextStartTime += audioBuffer.duration;
                        }
                    },
                    onclose: () => {
                        stopConversation();
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Live API Error:', e);
                        setStatus(`Error: ${e.message}`);
                        stopConversation();
                    },
                },
            });
            sessionRef.current = await sessionPromise;
        } catch (error) {
            console.error("Failed to start conversation:", error);
            setStatus(`Error: ${(error as Error).message}`);
            stopConversation();
        }
    };
    
    useEffect(() => {
        return () => stopConversation();
    }, [stopConversation]);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold">Status: <span className="text-indigo-400">{status}</span></h3>
                <button 
                    onClick={isSessionActive ? stopConversation : startConversation}
                    className={`px-4 py-2 rounded-lg font-semibold ${isSessionActive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isSessionActive ? 'End Conversation' : 'Start Conversation'}
                </button>
            </div>
            <div className="h-64 overflow-y-auto bg-gray-900 p-4 rounded-lg space-y-4">
                {transcripts.map((t, i) => (
                    <div key={i}>
                        <p><strong className="text-indigo-300">You:</strong> {t.user}</p>
                        <p><strong className="text-green-300">AI:</strong> {t.model}</p>
                    </div>
                ))}
                 {transcripts.length === 0 && !isSessionActive && (
                    <div className="text-center text-gray-500 flex items-center justify-center h-full">
                        <p>Click "Start Conversation" to begin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const TextToSpeech: React.FC = () => {
    const [text, setText] = useState('Hello! I am Edu-Connect\'s AI assistant.');
    const [loading, setLoading] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    const handleSpeak = async () => {
        if (!text.trim() || loading) return;
        setLoading(true);

        try {
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContextRef.current.destination);
                source.start();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <PromptInput value={text} onChange={setText} placeholder="Enter text to speak..." />
            <button onClick={handleSpeak} disabled={loading} className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600">
                {loading ? 'Generating speech...' : 'Speak'}
            </button>
        </div>
    );
};

const ComplexQuerySolver: React.FC = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    
    const handleSolve = async () => {
        if(!query.trim() || loading) return;
        setLoading(true);
        setResult('');

        try {
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
             const response = await ai.models.generateContent({
                model: "gemini-2.5-pro",
                contents: query,
                config: { thinkingConfig: { thinkingBudget: 32768 } }
             });
             setResult(response.text);
        } catch (e) {
            console.error(e);
            setResult('An error occurred while solving the query.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">Thinking Mode</h3>
            <p className="text-sm text-gray-400">Powered by Gemini 2.5 Pro with maximum thinking budget for your most complex problems in science, coding, and reasoning.</p>
            <PromptInput value={query} onChange={setQuery} placeholder="Enter a complex query..." />
            <button onClick={handleSolve} disabled={loading} className="w-full py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-600">
                {loading ? 'Solving...' : 'Solve with AI'}
            </button>
            {loading && <LoadingSpinner />}
            {result && (
                <div>
                    <h3 className="font-bold mb-2">Result:</h3>
                    <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-gray-300">{result}</div>
                </div>
            )}
        </div>
    );
};
import React, { useState } from 'react';

// Main App component
const App = () => {
    // State variables for main input and additional details
    const [indonesianInput, setIndonesianInput] = useState('');
    const [videoQuality, setVideoQuality] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    // Character state
    const [characters, setCharacters] = useState([
        { id: 1, name: '', nationality: '', characteristics: '', mainAction: '', emotion: '', age: '', clothing: '', accessories: '', gender: '' }
    ]);

    // New state for managing individual dialogue entries
    const [dialogues, setDialogues] = useState([]);

    // Background/Setting states
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState('');
    const [season, setSeason] = useState('');

    // Camera states
    const [cameraStyle, setCameraStyle] = useState('');
    const [cameraMovement, setCameraMovement] = useState('');
    const [cameraAngle, setCameraAngle] = useState('');
    const [cameraFocus, setCameraFocus] = useState('');
    const [lighting, setLighting] = useState('');
    const [colorGrading, setColorGrading] = useState('');

    // Audio states
    const [dialogueType, setDialogueType] = useState('');
    const [voiceMood, setVoiceMood] = useState('');
    const [environmentalSound, setEnvironmentalSound] = useState('');
    const [backgroundMusic, setBackgroundMusic] = useState('');

    // State variables for generated prompts
    const [generatedIndonesianPrompt, setGeneratedIndonesianPrompt] = useState('');
    const [generatedEnglishPrompt, setGeneratedEnglishPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // State for copy button feedback
    const [copyStatusIndonesian, setCopyStatusIndonesian] = useState('');
    const [copyStatusEnglish, setCopyStatusEnglish] = useState('');


    // Dropdown Options (unchanged)
    const locationOptions = [
        'Pilih Lokasi', 'Kota', 'Hutan', 'Pegunungan', 'Laut', 'Ruang Tamu', 'Dapur', 'Kantor', 'Sekolah', 'Luar Angkasa',
        'Kastil Abad Pertengahan', 'Gedung Pencakar Langit Modern', 'Gurun Pasir', 'Pulau Tropis', 'Laboratorium Ilmiah',
        'Galeri Seni', 'Stasiun Luar Angkasa', 'Bawah Laut', 'Planet Asing'
    ];
    const timeOptions = [
        'Pilih Waktu', 'Pagi', 'Siang', 'Sore', 'Malam', 'Tengah Hari', 'Senja', 'Fajar', 'Dini Hari', 'Tengah Malam'
    ];
    const weatherOptions = [
        'Pilih Cuaca', 'Cerah', 'Mendung', 'Hujan', 'Bersalju', 'Berangin', 'Berkabut', 'Badai Petir', 'Gerimis'
    ];
    const seasonOptions = [
        'Pilih Musim', 'Musim Semi', 'Musim Panas', 'Musim Gugur', 'Musim Dingin', 'Musim Hujan', 'Musim Kemarau'
    ];
    const cameraStyleOptions = [
        'Pilih Gaya', 'Sinematik', 'Dokumenter', 'Gaya DSLR', 'Gaya Telepon Genggam', 'Gaya Animasi', 'Realistis', 'Fantasi', 'Gaya Seni Konseptual', 'Gaya Film Klasik'
    ];
    const cameraMovementOptions = [
        'Pilih Pergerakan', 'Pan Kiri ke Kanan', 'Pan Kanan ke Kiri', 'Tilt Atas ke Bawah', 'Tilt Bawah ke Atas',
        'Zoom In', 'Zoom Out', 'Dolly In', 'Dolly Out', 'Orbit', 'Static (Diam)', 'Gerakan Bebas (Handheld)', 'Crane Shot', 'Tracking Shot'
    ];
    const cameraAngleOptions = [
        'Pilih Sudut', 'Sudut Mata Burung', 'Sudut Rendah', 'Sudut Tinggi', 'Sudut Mata Normal', 'POV (Point of View)',
        'Close-up', 'Medium Shot', 'Wide Shot', 'Extreme Close-up', 'Dutch Angle'
    ];
    const cameraFocusOptions = [
        'Pilih Fokus', 'Fokus Lembut', 'Fokus Tajam', 'Fokus Dangkal (Bokeh)', 'Fokus Dalam', 'Rak Fokus (Rack Focus)'
    ];
    const lightingOptions = [
        'Pilih Pencahayaan', 'Cahaya Alami', 'Cahaya Keras', 'Cahaya Lembut', 'Cahaya Remang', 'Cahaya Penuh Warna',
        'Pencahayaan Kontras Tinggi', 'Pencahayaan Siluet', 'Pencahayaan Latar (Backlight)', 'Pencahayaan Depan (Frontlight)'
    ];
    const colorGradingOptions = [
        'Pilih Gradasi Warna', 'Hangat (Warm)', 'Dingin (Cool)', 'Vibrant', 'Pudar (Muted)', 'Monokrom (B&W)',
        'Sepia', 'Fantasi', 'Horor', 'Retro', 'Modern'
    ];
    const dialogueTypeOptions = [
        'Pilih Tipe Dialog', 'Tanpa dialog', 'Informatif', 'Natural dialog', 'Monolog', 'Interview'
    ];
    const voiceMoodOptions = [
        'Pilih Mood', 'Happy', 'Sad', 'Cheerful', 'Angry', 'Calm', 'Excited', 'Mysterious', 'Dramatic', 'Fearful', 'Surprised', 'Content'
    ];
    const genderOptions = [
        'Pilih Gender', 'Laki-laki', 'Perempuan', 'Lainnya/Tidak disebutkan'
    ];

    // Character management functions
    const addCharacter = () => {
        setCharacters([...characters, { id: characters.length + 1, name: '', nationality: '', characteristics: '', mainAction: '', emotion: '', age: '', clothing: '', accessories: '', gender: '' }]);
    };

    const removeCharacter = (id) => {
        setCharacters(characters.filter(char => char.id !== id));
        // Also remove any dialogues associated with this character
        setDialogues(prevDialogues => prevDialogues.filter(dialogue => dialogue.characterId !== id));
    };

    const handleCharacterChange = (id, field, value) => {
        setCharacters(characters.map(char => char.id === id ? { ...char, [field]: value } : char));
    };

    // New Dialogue management functions
    const addDialogue = () => {
        setDialogues(prevDialogues => [...prevDialogues, { id: prevDialogues.length + 1, characterId: '', content: '' }]);
    };

    const removeDialogue = (id) => {
        setDialogues(prevDialogues => prevDialogues.filter(dialogue => dialogue.id !== id));
    };

    const handleDialogueChange = (id, field, value) => {
        setDialogues(prevDialogues => prevDialogues.map(dialogue => dialogue.id === id ? { ...dialogue, [field]: value } : dialogue));
    };

    // Function to handle copy action
    const handleCopy = (textAreaId, setCopyStatus) => {
        const textArea = document.getElementById(textAreaId);
        textArea.select();
        try {
            // Use document.execCommand('copy') as navigator.clipboard.writeText() might not work in iframes
            document.execCommand('copy');
            setCopyStatus('Disalin!');
        } catch (err) {
            console.error('Failed to copy:', err);
            setCopyStatus('Gagal menyalin!');
        } finally {
            setTimeout(() => setCopyStatus(''), 2000); // Clear message after 2 seconds
        }
    };

    // Function to construct the Indonesian prompt with placeholders for dialogues
    const constructIndonesianPrompt = () => {
        let sections = [];

        // Main description
        if (indonesianInput) {
            sections.push(indonesianInput.trim());
        }

        // Characters
        if (characters.length > 0) {
            let characterDescriptions = [];
            characters.forEach((char) => {
                let charDetails = [];
                let charLabel = char.name || `Karakter ${char.id}`; // Fallback label

                if (char.gender && char.gender !== 'Pilih Gender') charDetails.push(`berjenis kelamin ${char.gender}`);
                if (char.age) charDetails.push(`berusia ${char.age} tahun`);
                if (char.nationality) charDetails.push(`berkebangsaan ${char.nationality}`);
                if (char.characteristics) charDetails.push(`dengan karakteristik ${char.characteristics}`);
                if (char.clothing) charDetails.push(`mengenakan ${char.clothing}`);
                if (char.accessories) charDetails.push(`dilengkapi ${char.accessories}`);
                if (char.emotion) charDetails.push(`yang terlihat ${char.emotion}`);
                if (char.mainAction) charDetails.push(`melakukan aksi ${char.mainAction}`);

                if (charDetails.length > 0) {
                    characterDescriptions.push(`${charLabel} ${charDetails.join(', ')}`);
                } else if (char.name) {
                    characterDescriptions.push(char.name); // If only name is provided
                }
            });
            if (characterDescriptions.length > 0) {
                sections.push(`Karakter utama dalam adegan ini adalah ${characterDescriptions.join('; ')}.`);
            }
        }

        // Dialogues - Use placeholders here, but the surrounding text will be integrated
        if (dialogues.length > 0) {
            let dialogueClauses = [];
            dialogues.forEach((dialogue) => {
                const speaker = characters.find(char => char.id === dialogue.characterId);
                const speakerName = speaker ? (speaker.name || `Karakter ${speaker.id}`) : 'Karakter Tak Dikenal';
                if (dialogue.content) {
                    dialogueClauses.push(`${speakerName} mengucapkan: "{{DIALOGUE_CONTENT_${dialogue.id}}}"`);
                }
            });
            if (dialogueClauses.length > 0) {
                sections.push(`Video ini menampilkan dialog, di mana ${dialogueClauses.join('; ')}.`);
            }
        }

        // Background/Setting
        let settingDetails = [];
        if (location && location !== 'Pilih Lokasi') settingDetails.push(location);
        if (time && time !== 'Pilih Waktu') settingDetails.push(time);
        if (weather && weather !== 'Pilih Cuaca') settingDetails.push(weather);
        if (season && season !== 'Pilih Musim') settingDetails.push(`pada musim ${season}`);

        if (settingDetails.length > 0) {
            let settingPhrase = `Latar belakang adegan ini berlokasi di ${settingDetails[0]}`;
            if (settingDetails.length > 1) {
                settingPhrase += `, dengan ${settingDetails.slice(1).join(', ')}`;
            }
            sections.push(settingPhrase + '.');
        }

        // Camera
        let cameraDetails = [];
        if (cameraStyle && cameraStyle !== 'Pilih Gaya') cameraDetails.push(`gaya ${cameraStyle}`);
        if (cameraMovement && cameraMovement !== 'Pilih Pergerakan') cameraDetails.push(`pergerakan ${cameraMovement}`);
        if (cameraAngle && cameraAngle !== 'Pilih Sudut') cameraDetails.push(`sudut ${cameraAngle}`);
        if (cameraFocus && cameraFocus !== 'Pilih Fokus') cameraDetails.push(`fokus ${cameraFocus}`);
        if (lighting && lighting !== 'Pilih Pencahayaan') cameraDetails.push(`pencahayaan ${lighting}`);
        if (colorGrading && colorGrading !== 'Pilih Gradasi Warna') cameraDetails.push(`gradasi warna ${colorGrading}`);

        if (cameraDetails.length > 0) {
            sections.push(`Pengaturan kamera mencakup ${cameraDetails.join(', ')}.`);
        }

        // Audio
        let audioDetails = [];
        if (dialogueType && dialogueType !== 'Pilih Tipe Dialog') audioDetails.push(`tipe dialog: ${dialogueType}`);
        if (voiceMood && voiceMood !== 'Pilih Mood') audioDetails.push(`mood suara: ${voiceMood}`);
        if (environmentalSound) audioDetails.push(`suara lingkungan seperti ${environmentalSound}`);
        if (backgroundMusic) audioDetails.push(`musik latar: ${backgroundMusic}`);

        if (audioDetails.length > 0) {
            sections.push(`Komponen audio yang disertakan adalah ${audioDetails.join(', ')}.`);
        }

        // Video Quality
        if (videoQuality) {
            sections.push(`Video harus memiliki kualitas ${videoQuality}.`);
        }

        // Additional Details
        if (additionalDetails) {
            sections.push(`Catatan dan detail tambahan: ${additionalDetails}.`);
        }

        // Join all sections. Ensure proper capitalization for sentence start and a final period.
        let finalPrompt = sections.map(section => {
            let cleaned = section.trim();
            // Ensure section ends with a period if it doesn't already or is not a dialogue placeholder
            if (!cleaned.endsWith('.') && !cleaned.endsWith('"')) { // Check for ending quote for dialogue
                cleaned += '.';
            }
            return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        }).join(' '); // Join with a space for a flowing paragraph

        // Remove any double periods from joining sentences
        finalPrompt = finalPrompt.replace(/\.\s*\./g, '.');
        // Ensure final prompt ends with a single period if not already
        if (finalPrompt.length > 0 && !finalPrompt.endsWith('.') && !finalPrompt.endsWith('"')) {
            finalPrompt += '.';
        }

        return finalPrompt;
    };

    // Function to call Gemini API for translation
    const translateText = async (text, targetLang) => {
        // Updated prompt to specifically instruct the model to preserve markers with their content
        const prompt = `Terjemahkan teks berikut ke dalam bahasa ${targetLang}. Jika ada bagian yang dikurung kurawal ganda (misalnya, {{INI_ADALAH_PENANDA_SAYA}} atau "ISI DIALOG"), pertahankan seluruh bagian tersebut apa adanya dan jangan diterjemahkan:\n\n"${text}"`;
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const translatedText = result.candidates[0].content.parts[0].text;
                // Remove leading/trailing quotes if the model adds them
                return translatedText.replace(/^"|"$/g, '').trim();
            } else {
                console.error("Unexpected API response structure:", result);
                setError("Gagal menerjemahkan prompt. Silakan coba lagi.");
                return text;
            }
        } catch (err) {
            console.error("Error calling Gemini API for translation:", err);
            setError("Koneksi API gagal. Pastikan Anda memiliki koneksi internet.");
            return text;
        }
    };

    // Handle prompt generation
    const handleGeneratePrompt = async () => {
        setIsLoading(true);
        setError('');
        setCopyStatusIndonesian(''); // Clear previous copy status
        setCopyStatusEnglish(''); // Clear previous copy status

        // 1. Construct Indonesian prompt with dialogue placeholders
        const indonesianPromptWithPlaceholders = constructIndonesianPrompt();
        setGeneratedIndonesianPrompt(indonesianPromptWithPlaceholders);

        // 2. Translate the main Indonesian prompt (with placeholders) to English
        let englishPromptTranslated = await translateText(indonesianPromptWithPlaceholders, 'Inggris');

        // 3. Replace dialogue placeholders in the English prompt with original Indonesian dialogue content
        for (const dialogue of dialogues) {
            if (dialogue.content) {
                const placeholder = `{{DIALOGUE_CONTENT_${dialogue.id}}}`;
                // Direct replacement with original Indonesian content for English prompt
                englishPromptTranslated = englishPromptTranslated.replace(placeholder, dialogue.content);
            }
        }

        // Clean up any remaining placeholders in case some dialogues were empty or not handled
        englishPromptTranslated = englishPromptTranslated.replace(/\{\{DIALOGUE_CONTENT_\d+\}\}/g, '');

        setGeneratedEnglishPrompt(englishPromptTranslated);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex items-center justify-center font-sans">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-6xl border border-purple-300">
                <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-2 uppercase">
                    GENERATOR PROMPT VEO3
                </h1>
                <h2 className="text-lg font-semibold text-center text-purple-600 mb-8 pb-4 border-b-2 border-purple-200 uppercase">
                    APLIKASI INI 100% GRATIS BUAT KALIAN!
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
                            <label htmlFor="indonesian-input" className="block text-xl font-bold text-gray-800 mb-2">
                                Deskripsi Video Utama (Bahasa Indonesia):
                            </label>
                            <textarea
                                id="indonesian-input"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200 resize-y min-h-[120px]"
                                rows="4"
                                placeholder="Contoh: Seekor kucing oranye bermain dengan bola benang di ruang tamu yang cerah."
                                value={indonesianInput}
                                onChange={(e) => setIndonesianInput(e.target.value)}
                            ></textarea>
                        </div>

                        {/* DETAIL SUBJEK */}
                        <div className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-200">
                            <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b pb-2 border-purple-300">
                                Detail Subjek (Karakter)
                            </h2>
                            {characters.map((char, index) => (
                                <div key={char.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 last:mb-0">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-lg font-semibold text-gray-800">Karakter {char.name || index + 1}</h3>
                                        {characters.length > 1 && (
                                            <button
                                                onClick={() => removeCharacter(char.id)}
                                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200 text-xs"
                                                title="Hapus Karakter"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor={`char-${char.id}-name`} className="block text-sm font-medium text-gray-700 mb-1">Nama Karakter:</label>
                                            <input type="text" id={`char-${char.id}-name`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Budi, Susi" value={char.name} onChange={(e) => handleCharacterChange(char.id, 'name', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-gender`} className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
                                            <select
                                                id={`char-${char.id}-gender`}
                                                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                                                value={char.gender}
                                                onChange={(e) => handleCharacterChange(char.id, 'gender', e.target.value)}
                                            >
                                                {genderOptions.map(opt => <option key={opt} value={opt === 'Pilih Gender' ? '' : opt}>{opt}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-nationality`} className="block text-sm font-medium text-gray-700 mb-1">Kewarganegaraan:</label>
                                            <input type="text" id={`char-${char.id}-nationality`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Indonesia, Amerika" value={char.nationality} onChange={(e) => handleCharacterChange(char.id, 'nationality', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-age`} className="block text-sm font-medium text-gray-700 mb-1">Umur:</label>
                                            <input type="text" id={`char-${char.id}-age`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: 30, Remaja, Anak-anak" value={char.age} onChange={(e) => handleCharacterChange(char.id, 'age', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-clothing`} className="block text-sm font-medium text-gray-700 mb-1">Pakaian:</label>
                                            <input type="text" id={`char-${char.id}-clothing`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Kemeja biru, gaun malam" value={char.clothing} onChange={(e) => handleCharacterChange(char.id, 'clothing', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-accessories`} className="block text-sm font-medium text-gray-700 mb-1">Aksesoris Tambahan:</label>
                                            <input type="text" id={`char-${char.id}-accessories`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Topi, kacamata hitam, kalung" value={char.accessories} onChange={(e) => handleCharacterChange(char.id, 'accessories', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-main-action`} className="block text-sm font-medium text-gray-700 mb-1">Aksi Utama:</label>
                                            <input type="text" id={`char-${char.id}-main-action`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Berlari, menulis, berbicara" value={char.mainAction} onChange={(e) => handleCharacterChange(char.id, 'mainAction', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-characteristics`} className="block text-sm font-medium text-gray-700 mb-1">Karakteristik Subjek:</label>
                                            <input type="text" id={`char-${char.id}-characteristics`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Tinggi, berambut pirang, kacamata" value={char.characteristics} onChange={(e) => handleCharacterChange(char.id, 'characteristics', e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor={`char-${char.id}-emotion`} className="block text-sm font-medium text-gray-700 mb-1">Emosi:</label>
                                            <input type="text" id={`char-${char.id}-emotion`} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Bahagia, sedih, marah" value={char.emotion} onChange={(e) => handleCharacterChange(char.id, 'emotion', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={addCharacter}
                                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-purple-600 transition duration-200 mt-4 flex items-center justify-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Tambah Karakter</span>
                            </button>
                        </div>

                        {/* ISI DIALOG KARAKTER */}
                        <div className="bg-orange-50 p-6 rounded-lg shadow-inner border border-orange-200">
                            <h2 className="text-2xl font-bold text-orange-700 mb-4 border-b pb-2 border-orange-300">
                                Isi Dialog Karakter (Bahasa Indonesia)
                            </h2>
                            {dialogues.length > 0 ? (
                                dialogues.map((dialogue) => (
                                    <div key={dialogue.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 last:mb-0">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="text-md font-semibold text-gray-800">Dialog {dialogue.id}</h3>
                                            <button
                                                onClick={() => removeDialogue(dialogue.id)}
                                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200 text-xs"
                                                title="Hapus Dialog"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label htmlFor={`dialogue-speaker-${dialogue.id}`} className="block text-sm font-medium text-gray-700 mb-1">Pilih Karakter:</label>
                                                <select
                                                    id={`dialogue-speaker-${dialogue.id}`}
                                                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                                                    value={dialogue.characterId}
                                                    onChange={(e) => handleDialogueChange(dialogue.id, 'characterId', parseInt(e.target.value))}
                                                >
                                                    <option value="">Pilih Pembicara</option>
                                                    {characters.map(char => (
                                                        <option key={char.id} value={char.id}>
                                                            {char.name || `Karakter ${char.id}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor={`dialogue-content-${dialogue.id}`} className="block text-sm font-medium text-gray-700 mb-1">Isi Dialog:</label>
                                                <textarea
                                                    id={`dialogue-content-${dialogue.id}`}
                                                    className="w-full p-2 border border-gray-300 rounded-lg resize-y"
                                                    rows="2"
                                                    placeholder="Masukkan dialog di sini..."
                                                    value={dialogue.content}
                                                    onChange={(e) => handleDialogueChange(dialogue.id, 'content', e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">Tambahkan dialog untuk memulai.</p>
                            )}
                            <button
                                onClick={addDialogue}
                                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-orange-600 transition duration-200 mt-4 flex items-center justify-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Tambah Dialog Baru</span>
                            </button>
                        </div>

                        {/* LATAR */}
                        <div className="bg-yellow-50 p-6 rounded-lg shadow-inner border border-yellow-200">
                            <h2 className="text-2xl font-bold text-yellow-700 mb-4 border-b pb-2 border-yellow-300">
                                Latar Belakang
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Lokasi:</label>
                                    <select id="location" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={location} onChange={(e) => setLocation(e.target.value)}>
                                        {locationOptions.map(opt => <option key={opt} value={opt === 'Pilih Lokasi' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Waktu:</label>
                                    <select id="time" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={time} onChange={(e) => setTime(e.target.value)}>
                                        {timeOptions.map(opt => <option key={opt} value={opt === 'Pilih Waktu' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-1">Cuaca:</label>
                                    <select id="weather" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={weather} onChange={(e) => setWeather(e.target.value)}>
                                        {weatherOptions.map(opt => <option key={opt} value={opt === 'Pilih Cuaca' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">Musim:</label>
                                    <select id="season" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={season} onChange={(e) => setSeason(e.target.value)}>
                                        {seasonOptions.map(opt => <option key={opt} value={opt === 'Pilih Musim' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* KAMERA */}
                        <div className="bg-green-50 p-6 rounded-lg shadow-inner border border-green-200">
                            <h2 className="text-2xl font-bold text-green-700 mb-4 border-b pb-2 border-green-300">
                                Pengaturan Kamera
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="camera-style" className="block text-sm font-medium text-gray-700 mb-1">Gaya:</label>
                                    <select id="camera-style" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={cameraStyle} onChange={(e) => setCameraStyle(e.target.value)}>
                                        {cameraStyleOptions.map(opt => <option key={opt} value={opt === 'Pilih Gaya' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="camera-movement" className="block text-sm font-medium text-gray-700 mb-1">Pergerakan Kamera:</label>
                                    <select id="camera-movement" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={cameraMovement} onChange={(e) => setCameraMovement(e.target.value)}>
                                        {cameraMovementOptions.map(opt => <option key={opt} value={opt === 'Pilih Pergerakan' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="camera-angle" className="block text-sm font-medium text-gray-700 mb-1">Sudut Kamera:</label>
                                    <select id="camera-angle" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value)}>
                                        {cameraAngleOptions.map(opt => <option key={opt} value={opt === 'Pilih Sudut' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="camera-focus" className="block text-sm font-medium text-gray-700 mb-1">Fokus:</label>
                                    <select id="camera-focus" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={cameraFocus} onChange={(e) => setCameraFocus(e.target.value)}>
                                        {cameraFocusOptions.map(opt => <option key={opt} value={opt === 'Pilih Fokus' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="lighting" className="block text-sm font-medium text-gray-700 mb-1">Pencahayaan:</label>
                                    <select id="lighting" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={lighting} onChange={(e) => setLighting(e.target.value)}>
                                        {lightingOptions.map(opt => <option key={opt} value={opt === 'Pilih Pencahayaan' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="color-grading" className="block text-sm font-medium text-gray-700 mb-1">Gradasi Warna:</label>
                                    <select id="color-grading" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={colorGrading} onChange={(e) => setColorGrading(e.target.value)}>
                                        {colorGradingOptions.map(opt => <option key={opt} value={opt === 'Pilih Gradasi Warna' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* AUDIO */}
                        <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200">
                            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2 border-blue-300">
                                Pengaturan Audio
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="dialogue-type" className="block text-sm font-medium text-gray-700 mb-1">Tipe Dialog:</label>
                                    <select id="dialogue-type" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={dialogueType} onChange={(e) => setDialogueType(e.target.value)}>
                                        {dialogueTypeOptions.map(opt => <option key={opt} value={opt === 'Pilih Tipe Dialog' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="voice-mood" className="block text-sm font-medium text-gray-700 mb-1">Mood Suara:</label>
                                    <select id="voice-mood" className="w-full p-2 border border-gray-300 rounded-lg bg-white" value={voiceMood} onChange={(e) => setVoiceMood(e.target.value)}>
                                        {voiceMoodOptions.map(opt => <option key={opt} value={opt === 'Pilih Mood' ? '' : opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <label htmlFor="environmental-sound" className="block text-sm font-medium text-gray-700 mb-1">Suara Lingkungan (Contoh: Deru ombak, kicauan burung):</label>
                                    <input type="text" id="environmental-sound" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Suara kota ramai, desiran angin" value={environmentalSound} onChange={(e) => setEnvironmentalSound(e.target.value)} />
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <label htmlFor="background-music" className="block text-sm font-medium text-gray-700 mb-1">Musik Latar (Contoh: Musik orkestra, musik jazz lembut):</label>
                                    <input type="text" id="background-music" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Musik latar menenangkan, soundtrack epik" value={backgroundMusic} onChange={(e) => setBackgroundMusic(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Kualitas Video & DETAIL TAMBAHAN */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2 border-gray-300">
                                Kualitas Video & Detail Tambahan
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="video-quality" className="block text-sm font-medium text-gray-700 mb-1">Kualitas Video (Contoh: 4K, HD, Sinematik):</label>
                                    <input type="text" id="video-quality" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Contoh: Kualitas sinematik tinggi, resolusi 1080p" value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="additional-details" className="block text-sm font-medium text-gray-700 mb-1">Detail Tambahan (Catatan penting, instruksi khusus):</label>
                                    <textarea id="additional-details" className="w-full p-2 border border-gray-300 rounded-lg resize-y min-h-[80px]" rows="3" placeholder="Contoh: Fokus pada ekspresi wajah karakter, jangan ada unsur kekerasan." value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleGeneratePrompt}
                            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg mt-6 flex items-center justify-center space-x-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menghasilkan...
                                </span>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 00-7.072 0L5.464 11.464a5 5 0 007.072 7.072l1.9-1.9m.358-5.358l-.058-.058A2 2 0 0113.524 8.24l.058.058a2 2 0 01-.058 2.828zm2.828-2.828l.058-.058a2 2 0 012.828.058l-.058-.058a2 2 0 01-.058-2.828zm.058-2.828l-.058-.058a2 2 0 01.058-2.828l-.058-.058a2 2 0 01-2.828.058l-.058-.058a2 2 0 01-.058 2.828zM14 7l-2-2m-2-2H8l2-2m-2-2H4l2-2" />
                                    </svg>
                                    <span>Hasilkan Prompt Veo3</span>
                                </>
                            )}
                        </button>
                        {error && (
                            <p className="text-red-600 text-center mt-4 font-semibold text-lg">{error}</p>
                        )}
                    </div>

                    {/* Output Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-xl border border-blue-300">
                            <label htmlFor="indonesian-prompt" className="block text-2xl font-bold text-gray-800 mb-3">
                                Prompt Veo3 (Bahasa Indonesia):
                            </label>
                            <textarea
                                id="indonesian-prompt"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 resize-y min-h-[300px] font-mono text-sm shadow-inner"
                                rows="15"
                                readOnly
                                value={generatedIndonesianPrompt}
                            ></textarea>
                            <button
                                onClick={() => handleCopy('indonesian-prompt', setCopyStatusIndonesian)}
                                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-md font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
                                disabled={!generatedIndonesianPrompt}
                            >
                                Salin Prompt Bahasa Indonesia
                            </button>
                            {copyStatusIndonesian && <p className="text-green-600 text-sm mt-2">{copyStatusIndonesian}</p>}
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-xl border border-purple-300">
                            <label htmlFor="english-prompt" className="block text-2xl font-bold text-gray-800 mb-3">
                                Veo3 Prompt (English):
                            </label>
                            <textarea
                                id="english-prompt"
                                className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 resize-y min-h-[300px] font-mono text-sm shadow-inner"
                                rows="15"
                                readOnly
                                value={generatedEnglishPrompt}
                            ></textarea>
                            <button
                                onClick={() => handleCopy('english-prompt', setCopyStatusEnglish)}
                                className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg text-md font-semibold hover:bg-purple-700 transition duration-300 shadow-md"
                                disabled={!generatedEnglishPrompt}
                            >
                                Copy English Prompt
                            </button>
                            {copyStatusEnglish && <p className="text-green-600 text-sm mt-2">{copyStatusEnglish}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

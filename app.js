//import { getDatabase, ref, set } from "firebase/database";

document.addEventListener('DOMContentLoaded', () => {
    // const numKeywordsInput = document.getElementById('num-keywords');
    // const keywordsContainer = document.getElementById('keywords-container');
    const storyForm = document.getElementById('story-form');

    // // Function to create character input fields
    // function createKeywordInputs(numKeywords) {
    //     keywordsContainer.innerHTML = ''; // Clear the container first

    //     // Loop through and create character input fields
    //     for (let i = 1; i <= numKeywords; i++) {
    //         const keywordDiv = document.createElement('div');
    //         keywordDiv.className = 'character-input mt-4';

    //         const keywordLabel = document.createElement('label');
    //         keywordLabel.htmlFor = `keyword${i}`;
    //         keywordLabel.textContent = `Keyword ${i}:`;
    //         keywordLabel.className = 'block';

    //         const keywordInput = document.createElement('input');
    //         keywordInput.id = `keyword${i}`;
    //         keywordInput.type = 'text';
    //         keywordInput.className = 'block w-full bg-gray-800 text-white mt-1 p-2';

    //         keywordDiv.append(keywordLabel, keywordInput);
    //         keywordsContainer.appendChild(keywordDiv);
    //     }
    // }

    // // Create the initial character input fields
    // createKeywordInputs(numKeywordsInput.value);

    // // Add an event listener for the numCharactersInput to recreate the character input fields
    // numKeywordsInput.addEventListener('input', () => {
    //     createKeywordInputs(numKeywordsInput.value);
    // });

    // Add an event listener for the story form submission
    storyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get the user's input from the form
        // const exhibit = document.getElementById('exhibit').value;
        // const numKeywords = parseInt(document.getElementById('num-keywords').value, 10);
        const readerAge = parseInt(document.getElementById('reader-age').value, 10);
        const wordCount = parseInt(document.getElementById('word-count').value, 10)

        const moftKeywords = document.getElementById('moft-keywords').value;
        const foodKeywords = document.getElementById('food-keywords').value;
        const musicKeywords = document.getElementById('music-keywords').value;
        const manekKeywords = document.getElementById('manek-keywords').value;
        const fishingKeywords = document.getElementById('fishing-keywords').value;

        //writeKeywords(moftKeywords, foodKeywords, musicKeywords, manekKeywords, fishingKeywords);

        // Build the keywords array with keywords
        // const keywords = [];
        // for (let i = 1; i <= numKeywords; i++) {
        //     const word = document.getElementById(`keyword${i}`).value;
        //     keywords.push(word);
        //     console.log("Word: ", word)
        // }

        // Build the prompt based on the user's input
        let prompt = `Generate one single story based in Malaysia of less than ${wordCount} words for a reader aged ${readerAge} about the following in the format, topic : related topic1, related topic2. The story should be based in facts and should help the reader reflect.
        Dentures : ${moftKeywords}
        Heritage food: ${foodKeywords}
        Keronchong Music: ${musicKeywords}
        The Art of Manek: ${manekKeywords}
        Fishing the Portuguese Way: ${fishingKeywords};`
        // let prompt = `Create a story, based in facts, about ${exhibit} of ${wordCount} words or less for a reader aged ${readerAge}. `;
        // prompt += `The story should be set in Malaysia and should help the reader reflect on on the following ${numKeywords} topic(s): `;
        // keywords.forEach((keyword, index) => {
        //     prompt += `${keyword} ${index === keywords.length - 1 ? '.' : ', '}`;
        // });

        // Call the generateStory function and update the generated-story div
        const storyText = await generateStory(prompt);
        document.getElementById('generated-story').innerText = storyText;
    });

});

// function writeKeywords(moft, food, music, manek, fishing) {
//     const database = getDatabase();
//     set(ref(database, 'false_teeth/' + userId), {
//         moft_keywords: moft,
//         cuisine: food,
//         keronchong_music: music,
//         kasut_manek: manek,
//         portuguese_fishing: fishing
//     });
//   }

// Function to call the OpenAI API
async function generateStory(prompt) {
    console.log(prompt);

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 1200,
            n: 1,
            stop: null,
            temperature: 1.0,
        }),
    });

    const data = await response.json();
    console.log(data)
    if (data.choices && data.choices.length > 0) {
        return data.choices[0].text;
    } else {
        // Return a default message or an error message to the user
        return 'An error occurred while generating the story. Please try again.';
    }
}


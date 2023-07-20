//import { getDatabase, ref, set } from "firebase/database";

document.addEventListener('DOMContentLoaded', () => {

    const storyForm = document.getElementById('story-form');

    // Add an event listener for the story form submission
    storyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get the user's input from the form
        const readerAge = parseInt(document.getElementById('reader-age').value, 10);
        const wordCount = parseInt(document.getElementById('word-count').value, 10)

        const moftKeywords = document.getElementById('moft-keywords').value;
        const foodKeywords = document.getElementById('food-keywords').value;
        const musicKeywords = document.getElementById('music-keywords').value;
        const manekKeywords = document.getElementById('manek-keywords').value;
        const fishingKeywords = document.getElementById('fishing-keywords').value;

        let prompt = `Generate one single story based in Malaysia of less than ${wordCount} words for a reader aged ${readerAge} about the following in the format, topic : related topic1, related topic2. The story should be based in facts and should help the reader reflect.
        Dentures : ${moftKeywords}
        Heritage food: ${foodKeywords}
        Keronchong Music: ${musicKeywords}
        The Art of Manek: ${manekKeywords}
        Fishing the Portuguese Way: ${fishingKeywords};`

        const storyText = await generateStory(prompt);
        document.getElementById('generated-story').innerText = storyText;
    });
});


function saveAsPDF() {
    var HTML_Width = $(".story").width();
    var HTML_Height = $(".story").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


    html2canvas($(".story")[0], { allowTaint: true }).then(function (canvas) {
        canvas.getContext('2d');

        console.log(canvas.height + "  " + canvas.width);


        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }

        pdf.save("HTML-Document.pdf");
    });
}

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


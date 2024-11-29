const { test, expect, beforeEach, describe } = require('@playwright/test'); // Tuo Playwrightin testifunktiot\

// Koukku, joka suoritetaan ennen jokaista testiä
beforeEach(async ({ page, request }) => { 
    // Siirry määriteltyyn URL-osoitteeseen ennen jokaista testiä
    await page.goto('http://localhost:5173'); 
});

    
// Määrittele testisarja nimeltä 'UI tests'
describe('UI tests', () => {

    // Määrittele testi nimeltä 'is there h1 header'
    test('is there h1 header', async ({ page }) => {
        // Varmista, että elementti, joka sisältää tekstin 'Luo upeita mainoskuvia hetkessä', on näkyvissä
        await expect(await page.getByText('Luo upeita mainoskuvia hetkessä')).toBeVisible(); 
    });

    // Määrittele testi nimeltä 'is there button to get to stability 1 form'
    test('is there button to get to stability 1 form', async ({ page }) => { 
        // Etsi painike, jonka nimi on 'Luo mainoskuvasi stability1', ja klikkaa sitä
        await page.getByRole('button', { name: 'Luo mainoskuvasi stability1' }).click(); 
        // Varmista, että elementti, joka sisältää tekstin 'Stability AI 1 Form', on näkyvissä
        await expect(await page.getByText('Stability AI 1 Form')).toBeVisible(); 
    });
});

// Määrittele testisarja nimeltä 'image generation tests'
describe('image generation tests', () => {
    // Määrittele testi nimeltä 'can I generate image'
    test('can I generate image', async ({ page }) => { 
        // Etsi painike, jonka nimi on 'Luo mainoskuvasi stability1', ja klikkaa sitä
        await page.getByRole('button', { name: 'Luo mainoskuvasi stability1' }).click();
        // Täytä tekstikenttä, jonka testitunnus on 'testPrompt', tekstillä 'Tuoli Testi'
        await page.getByTestId('testPrompt').fill('Tuoli Testi'); 
        // Aseta tiedosto 'chair.png' tiedostokenttään, jonka testitunnus on 'testImg'
        await page.getByTestId('testImg').setInputFiles('chair.png'); 
        // Etsi painike, jonka nimi on 'Generoi mainos', ja klikkaa sitä
        await page.getByRole('button', { name: 'Generoi mainos' }).click(); 
        // Odota, että elementti, jonka testitunnus on 'generatedImage', tulee näkyviin (aikakatkaisu 35 sekuntia)
        const image = await page.waitForSelector('img[data-testid="generatedImage"]', { timeout: 35000 });
        // Hae 'src'-attribuutin arvo kuvasta
        const src = await image.getAttribute('src'); 

        // Tarkista, että kuvan src-attribuutti ei ole tyhjä
        expect(src).not.toBe('');
        expect(src).not.toBeNull();
    });
});
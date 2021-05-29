let U = require('../Views/utilities');
var out;

async function displayTripsByDriverPage(res, array) {
    out = ``;
    out = await U.addHeaderHTML(out);
    out += `<main>
                <div class="container">
                    <div class="row">`;

    out =               await U.driverTripsCard( 12, 12, array, out);

    out += `        </div>
                </div>
            </main>`;
    out = await U.addFooterHTML(out);
    res.send(out);
}

module.exports = {
    displayTripsByDriverPage
};
let U = require('../Views/utilities');
let Util = require('../Controllers/utilities');
var out;

async function displayContactPage(res) {

    Util.consoleLogHeader('Contact Page');

    out = ``;
    out = await U.addHeaderHTML(out);
    
    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Contact", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l2" id="green-border"><p></p></div>
                    
                    <div class="col s12 l8" id="green-border">

                        <div class="row white-text">  
                        
                            <p>
                                <table>
                                    <tr style="border-bottom:none;">
                                        <td style="border-left:1px solid white;color:white;">
                                            <h6>SYDNEY</h6>
                                            123 Smith St<br>
                                            Sydney NSW 2000<br>
                                            <b>Ph:</b> (02) 1234 5678
                                        </td>
                                        <td style="border-left:1px solid white;color:white;">
                                            <h6>MELBOURNE</h6>
                                            123 Smith St<br>
                                            Melbourne VIC 3000<br>
                                            <b>Ph:</b> (03) 1234 5678
                                        </td>
                                        <td style="border-left:1px solid white;color:white;">
                                            <h6>BRISBANE</h6>
                                            123 Smith St<br>
                                            Brisbane QLD 4000<br>
                                            <b>Ph:</b> (07) 1234 5678
                                        </td>
                                        <td style="border-left:1px solid white;color:white;">
                                            <h6>PERTH</h6>
                                            123 Smith St<br>
                                            Perth WA 7000<br>
                                            <b>Ph:</b> (08) 1234 5678
                                        </td>
                                    </tr>
                                </table>
                            </p>

                        </div>

                        <div class="row">     
                            <p>
                                <img src="/images/pic21.png" width="50%" />
                            </p>                       

                        </div>

                        <div class="row"> 
                        
                            <div class="col s12 l12 grey lighten-5">
                                <h5>Say Hi</h5>
                                <p>Please drop us a line to tell us how we are doing, any ideas or opinions, and any 
                                    feedback to help us improve our service.</p>
                                    <p><textarea name="comment" form="usrform"></textarea></p>
                                <form id="usrform" method="GET" action="#">
                                    <input type="submit" />

                                </form>
                                
                            </div>

                        </div>
                    
                    </div>

                    <div class="col s12 l1" id="green-border"><p></p></div>

                </div>
            </main>`;
    
    out = await U.addFooterHTML(out);
    res.send(out);
}

module.exports = {
    displayContactPage
};
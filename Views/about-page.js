let U = require('../Views/utilities');
let Util = require('../Controllers/utilities');
var out;

async function displayAboutPage(res) {

    Util.consoleLogHeader('About Page');

    out = ``;
    out = await U.addHeaderHTML(out);
    
    out += '<main>';
    out =       await U.addPageTitle(12, 12, "About", out);
    
    out += `    
    
                


                <div class="row" id="red-border">
                    
    
                    <div class="col s12 l2" id="green-border"><p></p></div>
                    
                    <div class="col s12 l8" id="green-border">
                        <div class="row">

                            <div class="col s12">
                                <ul class="tabs grey darken-4">
                                    <li class="tab col s3" id="about-nav"><a class="active" href="#about">About</a></li>
                                    <li class="tab col s3" id="about-nav"><a href="#how-it-works">How it works</a></li>                                    
                                    <li class="tab col s3" id="about-nav"><a href="#the-team">The team</a></li>
                                </ul>
                            </div>

                            <div id="about" class="col s12 grey lighten-5" style="margin-top:2%;">
                                <h4>About TripSpace</h4>
                                
                                <img src="/images/pic25.png" width="40%" style="float:right;" />

                                <p>TripSpace was born from a problem. The problem was in seeing vehicle after vehicle moving through
                                the city of Melbourne, where there would be a lone driver driving, but the remaining seats left vacant, 
                                and the ute tray totally empty. From this, it could also be inferred that trucks with large amounts of space
                                in the container, though not in plain sight, wer similarly often left empty on trips. Likewise, people movers 
                                such as vans and 7-seater SUV's 
                                could be seen having just a lone driver driving in the driver's seat leaving up to 12 remaining seats vacant 
                                and unused.</p>
                                
                                    <p>The question then arose. Can this unused space be utilised, if there was a medium to advertise it
                                to people and facilitate a booking system. If all of this unused space was better utilised, it would be
                                a strong contributor to reducing the number of vehicles on the road, thus making an impact on the 
                                betterment of the environment.</p>
                                
                                <p>The solution is TripSpace. With the underlying driving value to be for helping the environment, 
                                while providing the channel for drivers and trip users to connect and allow the unused vehicle space
                                in drivers' trips to start getting better utilised.</p>

                                <p>TripSpace is designed to be <b>driver-centric</b>, rather than user-centric like other solutions. 
                                This is because TripSpace aims to utilise drivers' existing "on-road" trips, rather than
                                creating new trips based on users' needs. In simpler terms, whereas normally a driver would be
                                going where the user or users want to go, with TripSpace the users are jumping aboard a pre-scheduled 
                                trip <b>based on where the driver needs to go</b>.</p>
                                
                            </div>
                            
                            <div id="how-it-works" class="col s12 grey lighten-5" style="margin-top:2%;">
                                <h4>How It Works</h4>

                                <p>The below model diagram shows the basic progression of events, starting from and initiated by the driver. This more
                                clearly shows that it is not drivers booking onto user trips - as is in the traditional taxi and more recent 
                                uber models, but rather users booking onto driver trips.</p>
                                
                                <p><img src="/images/how-it-works.png" width="80%" style="margin-left:10%; margin-top:4%; margin-bottom:4%;" /></p>

                                <p>The steps can be further explicated as follows:<br>
                                    <ol>
                                        <li><b>Driver Lists Trip:</b> A driver would list all his trips for the week or month where he knows he would be
                                            driving with an empty load or empty seats. He can specify the space available in cubic meters as well as the 
                                            number of seats available on his trip.</li>
                                        <li><b>User Searches for Trips:</b> A user would then be searching for trips on his route, where he needs to travel on seat,
                                            or needs to transport some goods between, or both. </li>
                                        <li><b>User Books Space on Trip:</b> Once the user has found a trip matching his route preferences, the user is then able to 
                                            book all of the space, or just a portion of the cargo space and a portion of the seat space, leaving the space he
                                            doesn't need available for other users to book.</li>
                                        <li><b>Next User Books Space on Same Trip:</b> Another user then searches based on his/her route preferences, and finds the same 
                                            trip, which has been partially booked by the previous user. The second user can then book from the available space that
                                            is left remaining, specifying his cargo space requirements and seat space requirements.</li>
                                        <li><b>Trip is Utilised:</b> In the above way, as more users book more of the space on a trip, the trip's percentage of space that
                                                is being used, versus unused, increases, and the trip is better utilised.</li>
                                    </ol>
                            </div>
                            
                            <div id="the-team" class="col s12 grey lighten-5" style="margin-top:2%;">
                                <h4>The Team</h4>
                                <p>We are a team of 4 university students belonging to Deakin University, undertaking a project for the Unit SIT725 under Alessio Boniti.
                                We have all contributed to this project to give it a good starting point.</p>
                                <p>
                                    <table>
                                        <tr style="border-bottom:none;">
                                            <td><img src="/images/prem.png" width="60%" class="circle responsive-img"</td>
                                            <td><img src="/images/blank_profile.png" width="60%" class="circle responsive-img"</td>
                                            <td><img src="/images/blank_profile.png" width="60%" class="circle responsive-img"</td>
                                            <td><img src="/images/blank_profile.png" width="60%" class="circle responsive-img"</td>
                                        </tr>
                                        <tr style="border-top:none;">
                                            <td>Prem Gangadharan</td>
                                            <td>MC JR Soriano</td>
                                            <td>Jason Shun-Nok Wong</td>
                                            <td>Muhammad Tayyab Butt</td>
                                        </tr>
                                    </table>
                                </p>
                            </div>

                        </div>                        
                    </div>

                    <div class="col s12 l2" id="green-border"><p></p></div>

                </div>

            </main>`;
    
    out = await U.addFooterHTML(out);
    res.send(out);
}

module.exports = {
    displayAboutPage
};
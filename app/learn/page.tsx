
/* when creating a page is seems that react wants to define a primary function and a primary return
 - is the primary function identified by the default keyowrd
 that primary function gets called by authConfig.ts
authConfig, if successful, returns the primary page file in the root of /app ('/' by default)

it's then assumed that to create a page I need to
 1) define resources to import
 2) define the primary function
 3) provide a return value
*/

import { MatchCard } from "@/components/MatchCard"

// imports

// primary function
export default function EventOverviewPage() {
    /* need to pull all games associated with player or team
    user role needs to be determined on signin/session creation */
    
    // array to hold games
    // TODO: should this be JSON, how to cache this, is this a lib func?
    const array = [];

    // return
    return (
        <div className="min-h-screen bg-[#f1f2f2] p-4 pb-24">
            
            {/* Header - could abstract this into component */}
            <div>
                <img className="w-24 h-24" source="@/icon-512x512.png"/>
                <h1 className="text-lg ">Team Kempson</h1>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-left gap-8"></div>

            {/* Match Cards */}
            <div className="space-y-10">

                for (let index = 0; index < array.length; index++) {
                        const element = array[index];
                        const now = <Date></Date>;
                        const gameDate = element.date;
                        
                        if (gameDate == now) {
                            const calTextColor = 'text-red-500';
                        } else {
                            const calTextColor = 'text-gray-500';
                        }

                        /* need a way to group games by date, could init a var with the first iter date
                        then on the next iter compare to previous, if same dont include new h5
                        if not add extra bottom margin and new h5 */
                        if (groupDate && groupDate == gameDate){
                            <h5 className="text-sm {calTextColor} mb-4">${gameDate}</h5>
                        }
                        
                        
                        
                        // TODO: rewrite match card to have default color values, check interface
                        <MatchCard
                            team="U19 Boys - ECNL"
                            opponent="vs Opponent"
                            startTime={gameDate}
                            result="L  0 - 2"
                            resultColor="bg-red-500/10"
                            views={165}
                            statusText="Preview Available"
                            isLive={false}
                        />


                        const groupDate = element.date;
                    }

            </div>

        </div>
    )


}

"use client"; // This is a client component
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import QueryResultPage from "../Components/QueryResults";
import { ElasticQueriesList } from "../Components/ElasticQueries";
import NavBar from "../Components/NavBar";

export default function page() {
    return (
        <>
            <NavBar />
            <div>
                <Tabs id="custom-animation" value="0" orientation="horizontal">
                    <TabsHeader className="h-full m-2" placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                        {ElasticQueriesList.map(
                            (query) => (
                                <Tab key={query.queryNumber} value={query.queryNumber}
                                    placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }}>
                                    Query {query.queryNumber + 1}
                                </Tab>
                            )
                        )}
                    </TabsHeader>
                    <TabsBody
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}

                    >
                        {ElasticQueriesList.map(
                            (query) => (
                                <TabPanel key={query.queryNumber} value={query.queryNumber}>
                                    <QueryResultPage queryNumber={query.queryNumber} queryDescription={query.queryDescription} query={query.query} />
                                </TabPanel>
                            )
                        )}
                    </TabsBody>
                </Tabs>
            </div>
        </>
    );
}
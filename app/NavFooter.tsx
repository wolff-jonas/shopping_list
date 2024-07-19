"use client";

import {Tabs, TabsList, TabsTab, Text} from "@mantine/core";
import Link from "next/link";
import {Tab} from "@/app/layout";

export default function NavFooter({tabs}: { tabs: Tab[] }) {
    return (
        <Tabs defaultValue={tabs[0].slug} inverted>
            <TabsList grow>
                {tabs.map(tab => {
                    return (
                        <TabsTab value={tab.slug} key={tab.slug}
                                 renderRoot={(props) => <Link href={tab.slug} {...props} />}>
                            <Text>{tab.text} </Text>
                        </TabsTab>
                    )
                })}
            </TabsList>
        </Tabs>
    );
}
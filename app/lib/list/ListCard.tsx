import {List} from "@/app/lib/types";
import {Button, Grid, GridCol, Paper, Text, Title} from "@mantine/core";
import Link from "next/link";
import {IconChevronRight} from "@tabler/icons-react";
import React from "react";

export default function ListCard({list}: { list: List }) {

    return (
        <Paper withBorder p="xs" radius="xs"
               bg="purple.1"
               component={Link} href={`/${list.id}`}>
            <Grid>
                <GridCol span="auto">
                    <Title>{list.name}</Title>
                    <Text>{list.items.filter(i => !i.checked).length} / {list.items.length}</Text>
                </GridCol>
                <GridCol span="content">
                    <Button variant="transparent" fullWidth h="100%" size="xl">
                        <IconChevronRight/>
                    </Button>
                </GridCol>
            </Grid>
        </Paper>
    );
}
import cx from "clsx";
import { Title, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./LogoLink.module.css";

export function LogoLink() {
    const InnerContent = () => (
        <>
            <Text inherit component="span" c="orange.8">
                Cine
            </Text>
            Browse
        </>
    );

    return (
        <Link href="/" className={cx(classes.logolink)}>
            <Title order={1} size="h1" visibleFrom="sm">
                <InnerContent />
            </Title>

            <Title order={1} size="h2" hiddenFrom="sm">
                <InnerContent />
            </Title>
        </Link>
    );
}

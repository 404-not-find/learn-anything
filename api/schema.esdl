CREATE MIGRATION topics TO {
    type Topic {
        required property title -> str;
        property key -> str;
        property mapID -> int64;
    }
}

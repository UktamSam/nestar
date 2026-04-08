import { registerEnumType } from "@nestjs/graphql";

export enum MemberType {                // TypeScriptda shunchaki buni yozamiz.
    USER = 'USER',
    AGENT = 'AGENT',
    ADMIN = 'ADMIN',
}
registerEnumType(MemberType, {          // NestJS'da ishlashi uchun enumlarni GraphQL'ga ro'yxatdan o'tkazish
    name: "MemberType",
})

export enum MemberStatus {
    ACTIVE = 'ACTIVE',
    DELETE = 'DELETE',
    BLOCK = 'BLOCK',
}
registerEnumType(MemberStatus, {
    name: "MemberStatus",
})

export enum MemberAuthType {
    PHONE = 'PHONE',
    EMAIL = 'EMAIL',
    TELEGRAM = 'TELEGRAM',
}
registerEnumType(MemberAuthType, {
    name: "MemberAuthType",
})

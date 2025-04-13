export type DecodedOneTimeToken = {
  jti: string
  uid: string
  email?: string
}

export type DecodedAccessToken = {
  sub: string
  username: string
}

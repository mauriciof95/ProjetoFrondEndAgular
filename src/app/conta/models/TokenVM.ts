export interface TokenVM
{
    authenticated : boolean;
    created : string;
    expiration : string;
    token : string;
    refresh_token : string;
}

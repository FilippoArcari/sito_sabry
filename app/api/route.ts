import { DATA_STRUCTURE } from "@/app/data/structure";
export function GET(request: Request) {
    return new Response(JSON.stringify(DATA_STRUCTURE), {
        headers: { "Content-Type": "application/json" },
    });
}
import { copyFile, mkdir } from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const source = path.join(root, "data", "site.json")
const destDir = path.join(root, "public", "data")
const dest = path.join(destDir, "site.json")

await mkdir(destDir, { recursive: true })
await copyFile(source, dest)
console.log("Synced data/site.json -> public/data/site.json")

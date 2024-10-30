const fs = require("fs")
const path = require("path")

const srcFolder = path.join(process.cwd(), "src")

// Function to search for files containing 'from "enzyme"' and '.jest' in the filename, then rename them
function findAndRenameFiles(dir) {
  const filesAndDirs = fs.readdirSync(dir, { withFileTypes: true })

  filesAndDirs.forEach(dirent => {
    const fullPath = path.join(dir, dirent.name)

    if (dirent.isDirectory()) {
      // Recursively search in subdirectories
      findAndRenameFiles(fullPath)
    } else if (
      dirent.isFile() &&
      [".js", ".ts", ".tsx"].includes(path.extname(fullPath)) &&
      fullPath.includes(".jest")
    ) {
      // Read the file content
      const content = fs.readFileSync(fullPath, "utf8")
      if (content.includes('from "enzyme"')) {
        // Rename the file to include .enzyme before the current extension
        const ext = path.extname(fullPath)
        const newFileName = path.basename(fullPath, ext) + `.enzyme${ext}`
        const newPath = path.join(dir, newFileName)

        fs.renameSync(fullPath, newPath)
        console.log(`Renamed: ${fullPath} -> ${newPath}`)
      }
    }
  })
}

// Start processing from the src folder
findAndRenameFiles(srcFolder)

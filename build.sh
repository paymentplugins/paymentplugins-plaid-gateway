PLUGIN_NAME="plaid-gateway"
PROJECT_PATH=$(pwd)
BUILD_PATH="${PROJECT_PATH}/build"
DEST_PATH="${BUILD_PATH}/${PLUGIN_NAME}"

echo "Creating build directory..."

rm -rf "$BUILD_PATH"
mkdir -p "$DEST_PATH"

echo "Installing PHP and JS dependencies"

npm install || exit "$?"
composer install || exit "$?"

echo "executing node build scripts..."

npm run build:core || exit "$?"

echo "installing php dependencies..."
composer install --no-dev || exit "$?"

echo "syncing files to build folder..."
rsync -rc --exclude-from="${PROJECT_PATH}/.distignore" "$PROJECT_PATH/" "$DEST_PATH/" --delete --delete-excluded

echo "Generate zip from build path"
cd "$BUILD_PATH" || exit "$?"

zip -q -r "${PLUGIN_NAME}.zip" "$PLUGIN_NAME/"

cd "$PROJECT_PATH"

echo "build finished"

read -p "hit enter to close terminal"

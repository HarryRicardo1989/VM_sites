#!/bin/bash

# Verifica se um argumento (caminho do arquivo) foi fornecido
if [ "$#" -ne 1 ]; then
    echo "Uso: $0 /caminho/para/o/arquivo.bin"
    exit 1
fi

FILE_PATH="$1" # O caminho completo para o arquivo
FILE_NAME=$(basename -- "$FILE_PATH") # Extrai o nome do arquivo do caminho
CRC_FILE="${FILE_NAME%.*}.crc" # Define o nome do arquivo de CRC
DIR_PATH=$(dirname -- "$FILE_PATH") # Extrai o diretório do caminho do arquivo

# Calcula o CRC32 do arquivo
CRC_VALUE=$(crc32 "$FILE_PATH")

# Verifica se o comando crc32 foi bem-sucedido
if [ $? -eq 0 ]; then
    # Salva o valor de CRC no arquivo no mesmo diretório do arquivo original
    echo "$CRC_VALUE" > "$DIR_PATH/$CRC_FILE"
    echo "CRC salvo em $DIR_PATH/$CRC_FILE"
else
    echo "Erro ao calcular o CRC32 de $FILE_PATH"
    exit 1
fi

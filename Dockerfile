FROM node:16.15.1-alpine

ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    # C = コンピュータ用の英語 ≠ en_US
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    # 外部のブラウザからコンテナ上で起動したNuxt.jsを参照できるようにする
    HOST=0.0.0.0 \
    API_URL=${API_URL}

WORKDIR ${HOME}

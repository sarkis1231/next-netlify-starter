// import config from 'config';

export function handleClickWindowOpen(url) {
    return () => {
        if (!url) {
            return;
        }
        window.open(url);
    };
}

export function handleClickTxId(txId) {
    if (!txId) {
        return;
    }

    // return handleClickWindowOpen(`${config.explorerTx}/${txId}`);
}

export function handleClickBlock(blockHash) {
    if (!blockHash) {
        return;
    }

    // return handleClickWindowOpen(`${config.explorerBlock}/${blockHash}`);
}

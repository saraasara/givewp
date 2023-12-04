import ModalPreview from './ModalPreview';
import IframeResizer from 'iframe-resizer-react';
import {useSelect} from '@wordpress/data';

import '../styles/index.scss';

interface BlockPreviewProps {
    formId: number;
    clientId: string;
    formFormat: 'fullForm' | 'modal' | 'newTab' | 'reveal';
    openFormButton: string;
    link: string;
}

/**
 * @since 3.1.2 replace reveal for newTab display.
 * @since 3.0.0
 */
export default function DonationFormBlockPreview({
    clientId,
    formId,
    formFormat,
    openFormButton,
    link,
}: BlockPreviewProps) {
    // @ts-ignore
    const selectedBlock = useSelect((select) => select('core/block-editor').getSelectedBlock(), []);
    const isBlockSelected = selectedBlock?.clientId === clientId;

    const enableIframe = isBlockSelected ? 'auto' : 'none';

    const isModalDisplay = formFormat === 'modal' || formFormat === 'reveal';
    const isNewTabDisplay = formFormat === 'newTab';

    return isNewTabDisplay ? (
        <a className={'givewp-donation-form-link'} href={link} target={'_blank'} rel={'noopener noreferrer'}>
            {openFormButton}
        </a>
    ) : isModalDisplay ? (
        <ModalPreview enableIframe={enableIframe} formId={formId} openFormButton={openFormButton} />
    ) : (
        <IframeResizer
            src={`/?givewp-route=donation-form-view&form-id=${formId}`}
            checkOrigin={false}
            style={{
                width: '1px',
                minWidth: '100%',
                border: '0',
                pointerEvents: enableIframe,
            }}
        />
    );
}
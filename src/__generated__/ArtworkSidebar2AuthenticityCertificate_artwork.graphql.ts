/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2AuthenticityCertificate_artwork = {
    readonly hasCertificateOfAuthenticity: boolean | null;
    readonly is_biddable: boolean | null;
    readonly " $refType": "ArtworkSidebar2AuthenticityCertificate_artwork";
};
export type ArtworkSidebar2AuthenticityCertificate_artwork$data = ArtworkSidebar2AuthenticityCertificate_artwork;
export type ArtworkSidebar2AuthenticityCertificate_artwork$key = {
    readonly " $data"?: ArtworkSidebar2AuthenticityCertificate_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2AuthenticityCertificate_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2AuthenticityCertificate_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasCertificateOfAuthenticity",
      "storageKey": null
    },
    {
      "alias": "is_biddable",
      "args": null,
      "kind": "ScalarField",
      "name": "isBiddable",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '5f36ec45df622eb62ad0ae612e9d6144';
export default node;

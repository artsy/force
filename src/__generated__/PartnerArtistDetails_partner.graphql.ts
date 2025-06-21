/**
 * @generated SignedSource<<b6014bff5df9c41e4448a9124c187cdb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerArtistDetails_partner$data = {
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "PartnerArtistDetails_partner";
};
export type PartnerArtistDetails_partner$key = {
  readonly " $data"?: PartnerArtistDetails_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerArtistDetails_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerArtistDetails_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "dcc5f00c6e560ebee66ad728ee5bace1";

export default node;

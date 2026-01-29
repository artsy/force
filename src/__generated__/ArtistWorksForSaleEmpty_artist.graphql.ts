/**
 * @generated SignedSource<<218d68da779eec3dcdb28fe8f99f5e19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistWorksForSaleEmpty_artist$data = {
  readonly id: string;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly " $fragmentType": "ArtistWorksForSaleEmpty_artist";
};
export type ArtistWorksForSaleEmpty_artist$key = {
  readonly " $data"?: ArtistWorksForSaleEmpty_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistWorksForSaleEmpty_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistWorksForSaleEmpty_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "7aa230316f544f03e36ef5d5e8b09608";

export default node;

/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Works_partner = {
    readonly slug: string;
    readonly internalID: string;
    readonly filtered_artworks: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ArtworkFilterArtworkGrid_filtered_artworks">;
    } | null;
    readonly " $refType": "Works_partner";
};
export type Works_partner$data = Works_partner;
export type Works_partner$key = {
    readonly " $data"?: Works_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"Works_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "input",
      "type": "FilterArtworksInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Works_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
      "alias": "filtered_artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        },
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtworkFilterArtworkGrid_filtered_artworks"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '304a9a0e45f6bb548c04d030a63ddd11';
export default node;

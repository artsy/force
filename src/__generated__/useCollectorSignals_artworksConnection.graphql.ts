/**
 * @generated SignedSource<<e9b4334b5bc5a3b3526928572be94503>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCollectorSignals_artworksConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly internalID: string;
      readonly isAcquireable: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "useCollectorSignals_artworksConnection";
};
export type useCollectorSignals_artworksConnection$key = {
  readonly " $data"?: useCollectorSignals_artworksConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCollectorSignals_artworksConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCollectorSignals_artworksConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
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
              "name": "isAcquireable",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkConnection",
  "abstractKey": null
};

(node as any).hash = "c4a46edcffb3cbe3aff5e994f0267252";

export default node;

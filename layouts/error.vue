<template>
    <div class="page">
        <Nav />

        <section class="section fullwidth-page bg-image bg-image-2">
            <div class="fullwidth-page-inner">
            <div class="section-md text-center">
                <div class="shell">
                <p class="breadcrumbs-custom-subtitle">Sorry, But the Page Was not Found</p>
                <p class="heading-1 breadcrumbs-custom-title">error 404</p>
                <p>You may have mistyped the address or the page may have moved.</p><a class="button button-secondary" href="/"> back to home page</a>
                </div>
            </div>
            <!-- Page Footer-->
            <div class="section-xs page-footer text-center">
                <div class="shell">
                <p class="right">&#169; <span class="copyright-year"></span> All Rights Reserved
                    &nbsp;<a href="#">Terms of Use</a>&nbsp;<span>and</span>&nbsp;<a href="privacy-policy.html">Privacy Policy</a>
                </p>
                </div>
            </div>
            </div>
        </section>
    </div>
</template>
<script>
  export default {
    props: ['error']
  }
</script>
# AjaxFlashMessageBundle
Symfony bundle to handle symfony flash messages called by ajax actions

Bundle will catch all FlashBag messages set in ajax actions in controllers when send an request via jquery and display it as it would show flash messages used in normal symfony controller actions.
You can override flash message styles as you wish. At the moment they should look quite user friendly/UX.

# Step 1: Install package

```shell
composer req kaistaerk/ajax-flash-message-bundle
```
# Step 2: Install assets
```console
php app/console assets:install public --symlink --relative
```
If your public directory is not `public` please modify the command above.

# Step 3: Include the messages template

In layout file:
```twig
{{ include('@AjaxFlashMessage/Messenger/messages.html.twig') }}
```
# Step 4: add assets to your main layout file

Add jQuery as well if it's not already done.
```twig
{% block javascripts %}
    // ...
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" type="text/javascript"></script>
    <script src="{{ asset('bundles/ajaxflashmessage/js/jquery.flash-messenger.js') }}" type="text/javascript"></script>
{% endblock %}
{% block stylesheets %}
    // ...
    <link href="{{ asset('bundles/ajaxflashmessage/css/flash-message.css') }}" type="text/css" rel="stylesheet" />
{% endblock %}
```
# Usage

Add this call to a script block in your layout or to some of your templates:
```html
<script>
$('#flash-messages').flashNotification('init');
</script>
```
